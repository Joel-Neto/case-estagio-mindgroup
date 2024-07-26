import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

const transactionController = new TransactionController();

routes.use(authMiddleware);
routes.post("/", transactionController.createTransaction);
routes.get("/all", transactionController.getAllTransactions);
routes.get("/total", transactionController.getAllTransactionsAmount);
routes.get("/transaction/:id", transactionController.getTransactionById);
routes.get("/type/:selectedType", transactionController.getTransactionsByType);
routes.put("/transaction/:id", transactionController.updateTransaction);
routes.delete("/transaction/:id", transactionController.deleteTransaction);

export default routes;
