import { Octokit } from "octokit";
import path from "path";
import { decodeEnv } from "../types/env.mjs";
import { decodeGHAssetInfo } from "../types/github-asset-info.mjs";

export class GithubService {
  octokit: Octokit;

  protected constructor() {
    const { GITHUB_ACCESS_TOKEN } = decodeEnv();
    this.octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });

    this.loadAssetInfo = this.loadAssetInfo.bind(this);
    this.loadAssetInfoAndImage = this.loadAssetInfoAndImage.bind(this);
    this.loadLogo = this.loadLogo.bind(this);
  }

  static initialize() {
    return new GithubService();
  }

  private async loadAssetInfo(
    owner: string,
    repo: string,
    fullInfoPath: string,
  ) {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: path.join(fullInfoPath, "info.json"),
        mediaType: { format: "raw" },
      });

      const parsed = JSON.parse(data as unknown as string);
      return decodeGHAssetInfo(parsed);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  private async loadLogo(owner: string, repo: string, fullInfoPath: string) {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: path.join(fullInfoPath, "logo.png"),
      });

      return "content" in data ? data.content : data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async loadAssetInfoAndImage(assetIdentifier: string, chainName?: string) {
    try {
      const { GITHUB_ASSETS_SLUG } = decodeEnv();
      const owner = GITHUB_ASSETS_SLUG.split("/")[0];
      const repo = GITHUB_ASSETS_SLUG.split("/")[1];
      const realPath = GITHUB_ASSETS_SLUG.split("/")[2];
      const fullInfoPath = path.join(
        chainName
          ? path.join(realPath, chainName, "assets", assetIdentifier)
          : path.join(realPath, assetIdentifier),
        chainName ? "" : "/info",
      );

      const info = await this.loadAssetInfo(owner, repo, fullInfoPath);
      const base64Logo = await this.loadLogo(owner, repo, fullInfoPath);

      return { info, base64Logo };
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
