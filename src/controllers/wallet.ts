import type { NextFunction, Request, Response } from "express";

export class WalletController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {} catch (error: any) {
      return next(error);
    }
  }
}