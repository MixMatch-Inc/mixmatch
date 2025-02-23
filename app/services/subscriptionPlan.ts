/**
 * List of subscription plans
 * Enum value corresponds to priority access
 * Higher value has access to all lower values
 */
export enum SubscriptionPlan {
  FREE = 1,
  PRO = 2,
  MASTER = 3,
}

const defaultPagePlan = SubscriptionPlan.MASTER;

const pageUrlSubscriptionPlan = {
  '/invoices': SubscriptionPlan.MASTER,
  '/documents': SubscriptionPlan.PRO,
  '/messages': SubscriptionPlan.PRO,
  '/home': SubscriptionPlan.FREE,
  '/pricing': SubscriptionPlan.FREE,
  '/profile': SubscriptionPlan.FREE,
  '/bookings': SubscriptionPlan.FREE,
  '/settings': SubscriptionPlan.FREE,
  '/tutorials': SubscriptionPlan.FREE,
  '/availability': SubscriptionPlan.FREE,
};

export const protectedPages = Object.keys(pageUrlSubscriptionPlan)

export function checkPageAccess(
  pageUrl: string,
  userPlan: SubscriptionPlan
): boolean {
  const pagePlan = getPageSubscriptionPlan(pageUrl);

  const res = checkPlanAccess(pagePlan, userPlan);

  return res
}

export function checkPlanAccess(
  pagePlan: SubscriptionPlan,
  userPlan: SubscriptionPlan
): boolean {
  return pagePlan <= userPlan;
}

function getPageSubscriptionPlan(pageUrl: string): SubscriptionPlan {
  const pagePlan = Object.entries(pageUrlSubscriptionPlan).find(
    ([pagePrefix]) => {
      return pageUrl.startsWith(pagePrefix);
    }
  );

  return pagePlan ? pagePlan[1] : defaultPagePlan;
}
