import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SubscriptionPlan } from '../../../services/subscriptionPlan';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (
          credentials?.email === 'user@test.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: '1',
            email: credentials.email,
            isAdmin: false,
            subscriptionPlan: SubscriptionPlan.FREE,
          };
        }
        if (
          credentials?.email === 'admin@test.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: '2',
            email: credentials.email,
            isAdmin: true,
            subscriptionPlan: SubscriptionPlan.FREE,
          };
        }

        if (
          credentials?.email === 'pro@test.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: '3',
            email: credentials.email,
            isAdmin: false,
            subscriptionPlan: SubscriptionPlan.PRO,
          };
        }

        if (
          credentials?.email === 'master@test.com' &&
          credentials?.password === 'password'
        ) {
          return {
            id: '4',
            email: credentials.email,
            isAdmin: false,
            subscriptionPlan: SubscriptionPlan.MASTER,
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};
