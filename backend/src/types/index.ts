import { Request } from 'express';

export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface ErrorResponse {
  message: string;
  status: number;
  success: false;
}

export interface SuccessResponse<T = any> {
  data: T;
  success: true;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
