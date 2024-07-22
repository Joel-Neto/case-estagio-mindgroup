import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  nome: string;

  @Column()
  tipo: "receita" | "despesa"; // Pode ser um enum se preferir

  // Relação com Transações
  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
