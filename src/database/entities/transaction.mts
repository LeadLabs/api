// @ts-nocheck
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../../types/transaction.mjs";
import { randomUUID } from "crypto";
import { Wallet } from "./wallet.mjs";

export enum TransactionStatus {
  PENDING = "PENDING",
  FAILED = "FAILED",
  SUCCESSFUL = "SUCCESSFUL",
}

@Entity({ name: "transactions" })
export class TransactionEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  coin: string;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  nonce: bigint;

  @Column()
  amount: bigint;

  @Column()
  hashOrId: string;

  @Column({ type: "enum", enum: AssetType, default: AssetType.NATIVE })
  assetType: AssetType;

  @Column({ nullable: true })
  assetIdentifier: string;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ManyToOne(() => Wallet, { eager: true })
  wallet: Wallet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  preInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  preUpdate() {
    this.updatedAt = new Date();
  }
}
