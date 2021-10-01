import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();

  return (
    <div>
      <Head>
        <title>Cadprime System</title>
      </Head>
      <main className="flex flex-col flex-wrap justify-center flex-grow items-center w-full h-screen bg-gray-100">
        {session && (
          <>
            <img
              className="rounded-full"
              src={session.user.image}
              alt="Profile pic"
            />
            <p>{session.user.email}</p>
          </>
        )}
        <h1 className="p-5 text-xl">
          {session ? `Hello ${session.user.name}` : "Sign in"}
        </h1>

        {session ? (
          <button
            className="py-2 px-6 rounded-full text-white bg-red-600 hover:bg-red-400"
            onClick={signOut}
          >
            Logout
          </button>
        ) : (
          <button
            className="py-2 px-6 rounded-full text-white bg-yellow-600 hover:bg-yellow-400"
            onClick={signIn}
          >
            Sign in
          </button>
        )}
      </main>
    </div>
  );
}
