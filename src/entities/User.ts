import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  // IMG
  @Column({type: "text", nullable: true})
  img?: string

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
