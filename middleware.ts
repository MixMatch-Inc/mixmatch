import handleMiddlewares from './app/middlewares/_handler';
import authMiddleware from './app/middlewares/auth';

export default handleMiddlewares([authMiddleware]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
