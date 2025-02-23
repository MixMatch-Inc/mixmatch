import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }
}
