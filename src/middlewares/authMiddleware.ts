import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";

type JwlPayload = {
  id: number;
};

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Token inválido.",
      });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(
      token,
      process.env.JWT_PASS as string
    ) as JwlPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Não autorizado.",
      });
    }

    const { password: _, ...loggedUser } = user;

    req.user = {
      ...loggedUser,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Token inválido.",
      });
    }
    // outros tratamentos de erro, se necessário
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor.",
    });
  }
}
