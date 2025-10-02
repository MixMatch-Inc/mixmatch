import { Router, Response } from 'express';
import { AuthRequest, SuccessResponse, User } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protected endpoint - requires authentication
router.get('/me', authenticateToken, (req: AuthRequest, res: Response<SuccessResponse<User>>): void => {
  // At this point, req.user is guaranteed to exist because authenticateToken middleware ran successfully
  const user = req.user!;

  res.json({
    data: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    success: true
  });
});

export default router;
