import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  nome: string;

  @Column()
  tipo: "receita" | "despesa"; 

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
