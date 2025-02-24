'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export default function LoginPage() {
  const submitLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });
    },
    []
  );

  return (
    <>
      <h1>Login Page</h1>
      <form
        action="#"
        onSubmit={submitLogin}
        className="flex flex-col gap-2 max-w-xs"
      >
        <input
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export default function LoginPage() {
  const submitLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });
    },
    []
  );

  return (
    <>
      <h1>Login Page</h1>
      <form
        action="#"
        onSubmit={submitLogin}
        className="flex flex-col gap-2 max-w-xs"
      >
        <input
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
