import { Request, Response } from "express";
import { categoryRepository } from "../repositories/categoryRepository";
import SendResponse from "../utils/SendResponse";

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryRepository.find();

      return SendResponse.success(
        res,
        200,
        "Categorias encontradas com sucesso.",
        categories
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro ao buscar categorias");
    }
  }

  async getCategoriesByType(req: Request, res: Response) {
    const { selectedType } = req.params;

    try {
      const categories = await categoryRepository.find({
        where: { tipo: selectedType as "receita" | "despesa" },
      });

      return SendResponse.success(
        res,
        200,
        `Categorias de tipo ${selectedType} encontradas com sucesso.`,
        categories
      );
    } catch (error) {
      return SendResponse.error(
        res,
        500,
        `Erro ao buscar categorias do tipo ${selectedType}`
      );
    }
  }
}
