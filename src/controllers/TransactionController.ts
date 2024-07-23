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
        // return res.status(400).json({
        //   success: false,
        //   message: "Usuário não encontrado.",
        // });
        return SendResponse.error(res, 400, "Usuário não encontrado.");
      }

      const transactions = await transactionRepository.find({
        where: { user: { id: userId } },
        relations: ["category"],
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Transações obtidas com sucesso.",
      //   data: transactions,
      // });

      return SendResponse.success(
        res,
        200,
        "Transações obtidas com sucesso.",
        transactions
      );
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno de servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Usuário não encontrado.",
      // });
      return SendResponse.error(res, 400, "Usuário não encontrado.");
    }

    const { id } = req.params;
    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
        relations: ["category"],
      });

      if (!transaction) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Transação não encontrada para o usuário atual.",
        // });
        return SendResponse.error(
          res,
          404,
          "Transação não encontrada para o usuário atual."
        );
      }

      // return res.status(200).json({
      //   success: true,
      //   message: "Transação obtida com sucesso.",
      //   data: transaction,
      // });

      return SendResponse.success(
        res,
        200,
        "Transações obtidas com sucesso.",
        transaction
      );
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno de servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async createTransaction(req: Request, res: Response) {
    const { idUser, idCategory, ...transaction } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(idUser) });

      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Usuário não existe.",
        // });
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const category = await categoryRepository.findOneBy({
        id: Number(idCategory),
      });

      if (!category) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Categoria não existe.",
        // });
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
      // return res.status(201).json({
      //   success: true,
      //   message: "Transação criada com sucesso.",
      //   data: newTransaction,
      // });
      return SendResponse.success(
        res,
        201,
        "Transação criada com sucesso.",
        newTransaction
      );
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno de servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const { idUser, idCategory, ...newTransaction } = req.body;

    if (!userId) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Usuário não encontrado.",
      // });
      return SendResponse.error(res, 404, "Usuário não encontrado.");
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
      });

      if (!transaction) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Transação não encontrada para o usuário atual.",
        // });
        return SendResponse.error(res, 404, "Transação não encontrada.");
      }

      const user = await userRepository.findOneBy({ id: Number(idUser) });

      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Usuário não existe.",
        // });
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const category = await categoryRepository.findOneBy({
        id: Number(idCategory),
      });

      if (!category) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Categoria não existe.",
        // });
        return SendResponse.error(res, 404, "Categoria não encontrada.");
      }

      const { password: _, ...userWithoutPass } = user;

      const updatedTransaction = await transactionRepository.save({
        id: Number(id),
        user: userWithoutPass,
        category,
        ...newTransaction,
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Transação atualizada com sucesso.",
      //   data: updatedTransaction,
      // });
      return SendResponse.success(
        res,
        200,
        "Transação atualizada com sucesso.",
        updatedTransaction
      );
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno de servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Usuário não encontrado.",
      // });
      return SendResponse.error(res, 404, "Usuário não encontrado.");
    }

    try {
      const transaction = await transactionRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
      });

      if (!transaction) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Transação não encontrada para o usuário atual.",
        // });
        return SendResponse.error(res, 404, "Transação não encontrada.");
      }

      await transactionRepository.delete(id);

      // return res.status(200).json({
      //   success: true,
      //   message: "Transação deletada com sucesso.",
      // });
      return SendResponse.success(res, 200, "Transação deletada com sucesso.");
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno de servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }
}
