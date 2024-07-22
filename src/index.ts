import express from "express";
import { AppDataSource } from "./data-source";
import transactionRoutes from "./routes/transactionRouter";
import userRoutes from "./routes/userRouter";
import categoryRoutes from "./routes/categoryRouter";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use("/transactions", transactionRoutes);
  app.use("/routes", categoryRoutes);
  app.use("/users", userRoutes);

  return app.listen(process.env.PORT);
});
