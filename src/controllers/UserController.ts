import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import SendResponse from "../utils/SendResponse";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await userRepository.findOneBy({ email });

      if (userExists) {
        return SendResponse.error(res, 400, "E-mail já cadastrado no sistema.");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      const { password: _, ...createdUser } = newUser;

      return SendResponse.success(
        res,
        201,
        "Usuário criado com sucesso.",
        createdUser
      );
    } catch {

      return SendResponse.error(res, 500, "Erro interno do servidor.");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return SendResponse.error(res, 404, "E-mail ou senha inválidos.");
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        return SendResponse.error(res, 400, "E-mail ou senha inválidos.");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS as string, {
        expiresIn: "8h",
      });

      const { password: _, ...userLogin } = user;

      return SendResponse.authLogin(
        res,
        200,
        "Login efetuado com sucesso.",
        userLogin,
        token
      );
    } catch {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return SendResponse.success(res, 200, "Usuários do sistema.", users);
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno ao buscar usuários.");
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }
      return SendResponse.success(
        res,
        200,
        "Usuário encontrado com sucesso.",
        user
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const updatedUser = await userRepository.save({
        id: Number(id),
        ...req.body,
      });

      return SendResponse.success(
        res,
        200,
        "Usuário atualizado com sucesso.",
        updatedUser
      );
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      await userRepository.delete(id);

      return SendResponse.success(res, 200, "Usuário excluído com sucesso.");
    } catch (error) {
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getProfile(req: Request, res: Response) {
    return res.status(200).json(req.body);
  }
}
