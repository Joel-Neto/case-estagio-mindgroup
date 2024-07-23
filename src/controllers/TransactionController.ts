import { Request, Response } from "express";
import { transactionRepository } from "../repositories/transactionRepository";
import { userRepository } from "../repositories/userRepository";
import { categoryRepository } from "../repositories/categoryRepository";

export class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const transactions = await transactionRepository.find({
        where: { user: { id: userId } },
        relations: ["category"],
      });

      return res.status(200).json({
        success: true,
        message: "Transações obtidas com sucesso.",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno de servidor.",
      });
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const { id } = req.params;
    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
        relations: ["category"],
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transação não encontrada para o usuário atual.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Transação obtida com sucesso.",
        data: transaction,
      });
    } catch (error) {
      console.error("Erro ao buscar transação por id:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno de servidor.",
      });
    }
  }

  async createTransaction(req: Request, res: Response) {
    const { idUser, idCategory, ...transaction } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(idUser) });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não existe.",
        });
      }

      const category = await categoryRepository.findOneBy({
        id: Number(idCategory),
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoria não existe.",
        });
      }

      const { password: _, ...userWithoutPass } = user;

      const newTransaction = transactionRepository.create({
        user: userWithoutPass,
        category,
        ...transaction,
      });

      await transactionRepository.save(newTransaction);
      return res.status(201).json({
        success: true,
        message: "Transação criada com sucesso.",
        data: newTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno de servidor.",
      });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const { idUser, idCategory, ...newTransaction } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transação não encontrada para o usuário atual.",
        });
      }

      const user = await userRepository.findOneBy({ id: Number(idUser) });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não existe.",
        });
      }

      const category = await categoryRepository.findOneBy({
        id: Number(idCategory),
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Categoria não existe.",
        });
      }

      const { password: _, ...userWithoutPass } = user;

      const updatedTransaction = await transactionRepository.save({
        id: Number(id),
        user: userWithoutPass,
        category,
        ...newTransaction,
      });

      return res.status(200).json({
        success: true,
        message: "Transação atualizada com sucesso.",
        data: updatedTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno de servidor.",
      });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transação não encontrada para o usuário atual.",
        });
      }

      await transactionRepository.delete(id);

      return res.status(200).json({
        success: true,
        message: "Transação deletada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno de servidor.",
      });
    }
  }
}
