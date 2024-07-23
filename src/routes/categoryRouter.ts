import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CategoryController } from "../controllers/CategoryController";

const routes = Router();
const categoryController = new CategoryController();

routes.use(authMiddleware);
routes.get("/all", categoryController.getAllCategories);
routes.get("/type/:selectedType", categoryController.getCategoriesByType);
export default routes;
