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
        // return res.status(400).json({
        //   success: false,
        //   message: "E-mail já cadastrado no sistema.",
        // });
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

      // return res.status(201).json({
      //   success: true,
      //   message: "Usuário criado com sucesso.",
      //   data: createdUser,
      // });

      return SendResponse.success(
        res,
        201,
        "Usuário criado com sucesso.",
        createdUser
      );
    } catch {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno do servidor.",
      // });

      return SendResponse.error(res, 500, "Erro interno do servidor.");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "E-mail ou senha inválidos.",
        // });
        return SendResponse.error(res, 404, "E-mail ou senha inválidos.");
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        // return res.status(400).json({
        //   success: false,
        //   message: "E-mail ou senha inválidos.",
        // });
        return SendResponse.error(res, 400, "E-mail ou senha inválidos.");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_PASS as string, {
        expiresIn: "8h",
      });

      const { password: _, ...userLogin } = user;

      // return res.status(200).json({
      //   success: true,
      //   message: "Login efetuado com sucesso.",
      //   data: userLogin,
      //   token,
      // });

      return SendResponse.success(
        res,
        200,
        "Login efetuado com sucesso.",
        token
      );
    } catch {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno do servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      // res.json(users);
      return SendResponse.success(res, 200, "Usuários do sistema.", users);
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro ao buscar usuários.",
      // });
      return SendResponse.error(res, 500, "Erro interno ao buscar usuários.");
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Usuário não encontrado.",
        // });
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }
      return SendResponse.success(
        res,
        200,
        "Usuário encontrado com sucesso.",
        user
      );
    } catch (error) {
      // res.status(500).json({
      //   success: false,
      //   message: "Erro interno do servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Usuário não encontrado.",
        // });
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      const updatedUser = await userRepository.save({
        id: Number(id),
        ...req.body,
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Usuário atualizado com sucesso.",
      //   data: updatedUser,
      // });
      return SendResponse.success(
        res,
        200,
        "Usuário atualizado com sucesso.",
        updatedUser
      );
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno do servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        // return res.status(404).json({
        //   success: false,
        //   message: "Usuário não encontrado.",
        // });
        return SendResponse.error(res, 404, "Usuário não encontrado.");
      }

      await userRepository.delete(id);

      // return res.status(200).json({
      //   success: true,
      //   message: "Usuário excluído com sucesso.",
      // });
      return SendResponse.success(res, 200, "Usuário excluído com sucesso.");
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro interno do servidor.",
      // });
      return SendResponse.error(res, 500, "Erro interno de servidor.");
    }
  }

  async getProfile(req: Request, res: Response) {
    return res.status(200).json(req.body);
  }
}
