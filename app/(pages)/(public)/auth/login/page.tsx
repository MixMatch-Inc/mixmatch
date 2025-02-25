'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
    },
    [email, password]
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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