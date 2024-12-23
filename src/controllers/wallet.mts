import type { NextFunction, Request, Response } from "express";
import { decodeWallet } from "../types/wallet.mjs";
import { AppDataSource } from "../database/index.mjs";
import { Wallet } from "../database/entities/wallet.mjs";
import { parseJSONResponse } from "../utils/misc";
import { ILike } from "typeorm";
import assert from "assert";
import { HttpException } from "../custom/error.mjs";

// Repository
const walletRepository = AppDataSource.getRepository(Wallet);

export class WalletController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse payload
      const payload = decodeWallet(req.body);
      // Initialize wallet
      const wallet = new Wallet();
      wallet.address = payload.address;
      // Insert
      const result = await walletRepository.save(wallet);

      return parseJSONResponse(res, { result }, 201);
    } catch (error: any) {
      return next(error);
    }
  }

  static async findByAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const stringParam = "%" + req.params.address + "%";
      // Find wallet
      const result = await walletRepository.findOneBy({
        address: ILike(stringParam),
      });
      // Must exist
      assert.ok(!!result, new HttpException(404, "Wallet not found"));

      return parseJSONResponse(res, { result }, 200);
    } catch (error: any) {
      return next(error);
    }
  }
}
