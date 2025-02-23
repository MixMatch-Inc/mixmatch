import "next-auth";
import { SubscriptionPlan } from "../services/subscriptionPlan";

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
    subscriptionPlan: SubscriptionPlan;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
    subscriptionPlan: SubscriptionPlan;
  }
}
