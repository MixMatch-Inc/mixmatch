import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { checkPageAccess, protectedPages } from "../services/subscriptionPlan";
import { checkPathStartsWith } from "./_utils";
import { MiddlewareFactory } from "./interface";

const publicPathStarts = [
  "/auth/login", 
  "/auth/register",
  "/",
  "/blog",
  "/privacy",
  "/toc",
  "/403",
  "/404",
];
const adminPathStarts = ["/admin"];

const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {

    if (checkPathStartsWith(request.nextUrl.pathname, publicPathStarts, protectedPages)) {
      return next(request, _next);
    }

    const isAdminSection = checkPathStartsWith(
      request.nextUrl.pathname,
      adminPathStarts
    );

    return withAuth(
      function middleware(req) {
        const token = req.nextauth.token

        if (isAdminSection) {
          if (token.isAdmin === true) {
            return  NextResponse.next()
          } else {
            return NextResponse.redirect(new URL('/403', request.url))
          }
        }

        const hasPageAccess = checkPageAccess(request.nextUrl.pathname, token.subscriptionPlan);

        if (hasPageAccess) {
          return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/403', request.url))
      },{
      callbacks: {
        authorized: ({ token }) => {
          return !!token
        },
      },
    })(request as NextRequestWithAuth, _next);
  };
};

export default authMiddleware;
