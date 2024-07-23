import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();
const userController = new UserController();

routes.post("/", userController.create);
routes.post("/login", userController.login);

routes.use(authMiddleware);

routes.get("/profile", userController.getProfile);
routes.get("/all", userController.getAllUsers);
routes.get("/user/:id", userController.getUserById);
routes.put("/user/:id", userController.updateUser);
routes.delete("/user/:id", userController.deleteUser);

export default routes;
