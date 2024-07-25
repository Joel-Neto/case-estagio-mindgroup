import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import transactionRoutes from "./routes/transactionRouter";
import userRoutes from "./routes/userRouter";
import categoryRoutes from "./routes/categoryRouter";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("CHEGOUUUU")
  })
  app.use("/transactions", transactionRoutes);
  app.use("/users", userRoutes);
  app.use("/categories", categoryRoutes);

  return app.listen(process.env.PORT);
});
