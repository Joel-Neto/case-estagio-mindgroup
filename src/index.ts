import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import transactionRoutes from "./routes/transactionRouter";
import userRoutes from "./routes/userRouter";
import categoryRoutes from "./routes/categoryRouter";
import path from "path";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000", // Permite solicitações apenas do frontend
    })
  );

  app.use("/transactions", transactionRoutes);
  app.use("/users", userRoutes);
  app.use("/categories", categoryRoutes);

  const port = process.env.PORT || 3002;

  app.use("/files", express.static(path.join(__dirname, "uploads")));

  return app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
