import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      // After a successful login, redirect the user here:
      callbackUrl: '/player',
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="User login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid h-screen place-items-center bg-gray-900">
        <div className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md w-80">
          {/* The Logo */}
          <Image
            src="/slca_logo.png"
            alt="SLCA Logo"
            height={150}
            width={248}
          />
          <h1 className="text-2xl font-bold text-purple-400 mt-3 mb-4">
            Login
          </h1>

          {/* Google Sign-in */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/player' })}
            className="flex items-center justify-center bg-blue-600 text-white font-semibold rounded-md p-3 w-full mb-2 hover:bg-blue-700 transition duration-200"
          >
            <ArrowRightCircleIcon className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>

          {/* GitHub Sign-in */}
          <button
            onClick={() => signIn('github', { callbackUrl: '/player' })}
            className="flex items-center justify-center bg-gray-700 text-white font-semibold rounded-md p-3 w-full mb-2 hover:bg-gray-600 transition duration-200"
          >
            <ArrowRightCircleIcon className="h-5 w-5 mr-2" />
            Sign in with GitHub
          </button>

          {/* Email/Password Login Form */}
          <form onSubmit={handleCredentialsLogin} className="mt-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mb-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mb-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-purple-400 transition duration-200"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md p-2 transition duration-200"
            >
              Sign in with Email
            </button>
          </form>

          {/* Back to Home */}
          <Link href="/" className="block mt-4">
            <div className="flex items-center text-gray-300 hover:text-gray-100 transition duration-150">
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              <p className="font-medium">Back Home</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
