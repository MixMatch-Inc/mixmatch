import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catch-async';
import { User } from '../models/User';
import { signToken } from '../utils/jwt';

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken(user.id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: user.getPublicProfile(),
    },
  });
});
