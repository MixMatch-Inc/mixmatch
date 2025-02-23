# Authorization

## Default access restriction to pages

If there is no specific access defined for a page, we consider this page is only accssible for logged user with the highest subscription plan, which is the "Master" plan.

## Public pages

Public pages are accessible without having to be logged in.  
Public pages have to explicitely be defined in the [Auth middleware](../app/middlewares/auth.ts).

## Admin pages

Admin pages are accessible only for administrators.
Admin pages have to explicitely be defined in the [Auth middleware](../app/middlewares/auth.ts).

## Access depending on subscription plan

Pages accessible depending on subscription plans has to be define in the [subscriptionPlan service](../app/services/subscriptionPlan.ts).
Obviously, user has to be logged in order to be able to access them.

There are 3 levels of subscriptions :

- Free : this is the default plan for new users
- Pro
- Master

The system work like pyramidal accesses, meaning that:

- Master user has access to Master, Pro and Free pages.
- Pro user has access to Pro and Free pages.
- Free user only has access to Free pages.

### How to add access restriction to a new page

You have to add you url path prefix to the `pageUrlSubscriptionPlan` in the [subscriptionPlan service](../app/services/subscriptionPlan.ts).  
It's a mapping where you can define url path prefix with a dedicated subscription plan.  
Let's see an example :

```typescript
const pageUrlSubscriptionPlan = {
  '/invoices': SubscriptionPlan.MASTER,
  '/documents': SubscriptionPlan.PRO,
  '/messages': SubscriptionPlan.PRO,
  '/home': SubscriptionPlan.FREE,
  '/profile': SubscriptionPlan.FREE,
  '/settings': SubscriptionPlan.FREE,
  '/availability': SubscriptionPlan.FREE,
};
```

With this, all url path starting by `/messages` will be only available for Master and Pro users.  
Meaning url like `/messages`, `/messages/id`, `/messages/id/something` or `/messages/new` will all match the `/messages` mapping and be accessible in Pro plan.

### What if I want tabs in a page with different access restrictions

Let's say you have a page `/documents` with two tabs "contracts" and "invoices".  
You want the "invoices" tab to be accessible for Free plan and "contracts" tab to be accessible for Pro plan.  
The nyou have 2 ways to do this :

- Use nested pages and define nested pages in the `pageUrlSubscriptionPlan` variable
- Implement the restriction explicitely in your page using the `checkPlanAccess` method exported from the [subscriptionPlan service](../app/services/subscriptionPlan.ts).

#### Solution 1 : use nested pages (recommended)

Create 2 nedted pages `/documents/contracts` and `/documents/invoices` which contains the detail of the tab.  
Then we have to choose on of those page (preferably the free one so `/documents/invoices`) as the default page to access the "Documents" page.

Modify the `pageUrlSubscriptionPlan` to add those urls (see below)

```typescript
const pageUrlSubscriptionPlan = {
  '/invoices': SubscriptionPlan.MASTER,
  '/documents/contracts': SubscriptionPlan.PRO,
  '/documents/invoices': SubscriptionPlan.FREE,
  '/messages': SubscriptionPlan.PRO,
  '/home': SubscriptionPlan.FREE,
  '/profile': SubscriptionPlan.FREE,
  '/settings': SubscriptionPlan.FREE,
  '/availability': SubscriptionPlan.FREE,
};
```

If you need to display the tabs conditionnaly, you can use the `checkPageAccess` method exported from the [subscriptionPlan service](../app/services/subscriptionPlan.ts).

_This example is just an illustration and not the exact way to implement it in your code._

```typescript
const shouldDisplayInvoicesTab = checkPageAccess(
  "/documents/invoices",
  user.subscriptionPlan
);
const shouldDisplayContractsTab = checkPageAccess(
  "/documents/contracts",
  user.subscriptionPlan
);
```

#### Solution 2 : check tab display only programmaticaly

If you need to display the tabs conditionnaly without relying on specific pages/urls, you can use the `checkPlanAccess` method exported from the [subscriptionPlan service](../app/services/subscriptionPlan.ts).

_This example is just an illustration and not the exact way to implement it in your code._

```typescript
const shouldDisplayInvoicesTab = checkPlanAccess(
  SubscriptionPlan.Free,
  user.subscriptionPlan
);
const shouldDisplayContractsTab = checkPlanAccess(
  SubscriptionPlan.Pro,
  user.subscriptionPlan
);
```

> The drawback of this is that you have to handle access restriction in different places when calling `checkPlanAccess` : in your pages, maybe in your sub-components, ...  
> With the solution 1, all access restrictions are defined in the [subscriptionPlan service](../app/services/subscriptionPlan.ts).
