import { Request, Response } from "express";
import { transactionRepository } from "../repositories/transactionRepository";
import { userRepository } from "../repositories/userRepository";
import { categoryRepository } from "../repositories/categoryRepository";
import SendResponse from "../utils/SendResponse";

export class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return SendResponse.error(res, 400, "Usuário não encontrado.");
      }

      const transactions = await transactionRepository.find({
        where: { user: { id: userId } },
        relations: ["category"],
      });

      return SendResponse.success(
        res,
        200,
        "Transações obtidas com sucesso.",
        transactions
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }
  async getAllTransactionsAmount(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return SendResponse.error(res, 400, "Usuário não encontrado.");
      }

      const transactions = await transactionRepository.find({
        where: { user: { id: userId } },
        relations: ["category"],
      });

      const total = transactions.reduce(
        (sum, transaction) =>
          transaction.type === "receita"
            ? sum + Number(transaction.amount)
            : sum - Number(transaction.amount),
        0
      );

      return SendResponse.success(
        res,
        200,
        "Transações obtidas com sucesso.",
        total
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return SendResponse.error(res, 400, "Usuário não encontrado.");
    }

    const { id } = req.params;
    try {
      const transaction = await transactionRepository.findOne({
        where: { id, user: { id: userId } },
        relations: ["category"],
      });

      if (!transaction) {
        return SendResponse.error(
          res,
          404,
          "Transação não encontrada para o usuário atual."
        );
      }

      return SendResponse.success(
        res,
        200,
        "Transações obtidas com sucesso.",
        transaction
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getTransactionsByType(req: Request, res: Response) {
    const { selectedType } = req.params;
    const userId = req.user?.id;

    try {
      // Ajustar a consulta para incluir o filtro por tipo e ID do usuário
      const transactions = await transactionRepository.find({
        where: {
          type: selectedType as "receita" | "despesa",
          user: { id: userId },
        },
        relations: ["category"],
      });

      return SendResponse.success(
        res,
        200,
        `Transações de tipo ${selectedType} encontradas com sucesso.`,
        transactions
      );
    } catch (error) {
      console.error(
        `Erro ao buscar transações do tipo ${selectedType}:`,
        error
      );
      return SendResponse.error(
        res,
        500,
        `Erro ao buscar transações do tipo ${selectedType}`
      );
    }
  }

  async createTransaction(req: Request, res: Response) {
    const { idUser, idCategory, ...transaction } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: idUser });

      if (!user) {
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const category = await categoryRepository.findOneBy({
        id: idCategory,
      });

      if (!category) {
        return SendResponse.error(
          res,
          404,
          "Categoria não cadastrada no sistema."
        );
      }

      const { password: _, ...userWithoutPass } = user;

      const newTransaction = transactionRepository.create({
        user: userWithoutPass,
        category,
        ...transaction,
      });

      await transactionRepository.save(newTransaction);
      return SendResponse.success(
        res,
        201,
        "Transação criada com sucesso.",
        newTransaction
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const { idUser, idCategory, ...newTransaction } = req.body;

    if (!userId) {
      return SendResponse.error(res, 404, "Usuário não encontrado.");
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!transaction) {
        return SendResponse.error(res, 404, "Transação não encontrada.");
      }

      const user = await userRepository.findOneBy({ id: idUser });

      if (!user) {
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const category = await categoryRepository.findOneBy({
        id: idCategory,
      });

      if (!category) {
        return SendResponse.error(res, 404, "Categoria não encontrada.");
      }

      const { password: _, ...userWithoutPass } = user;

      const updatedTransaction = await transactionRepository.save({
        id: Number(id),
        user: userWithoutPass,
        category,
        ...newTransaction,
      });

      return SendResponse.success(
        res,
        200,
        "Transação atualizada com sucesso.",
        updatedTransaction
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return SendResponse.error(res, 404, "Usuário não encontrado.");
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id, user: { id: userId } },
      });

      if (!transaction) {
        return SendResponse.error(res, 404, "Transação não encontrada.");
      }

      await transactionRepository.delete(id);

      return SendResponse.success(res, 200, "Transação deletada com sucesso.");
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }
}
