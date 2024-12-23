// @ts-nocheck
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { AssetType } from "../../types/transaction.mjs";
import { randomUUID } from "crypto";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  preInsert() {
    this.id = randomUUID();
  }
}
