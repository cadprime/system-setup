import React, { useState } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { addTimeIn, selectTimeIn } from "../slices/timeInSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [session] = useSession();
  const [btnStatus, setBtnStatus] = useState(false);

  const locale = "en";
  const [today, setDate] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const timeIn = useSelector(selectTimeIn);

  const addTime = () => {
    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = Date();

    const time = today.toLocaleTimeString(locale, {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    const userName = session.user.name;
    const userEmail = session.user.email;

    const timeIn = {
      date,
      day,
      time,
      userName,
      userEmail,
      btnStatus,
    };
    dispatch(addTimeIn(timeIn));
    setBtnStatus(!btnStatus);
    console.log(timeIn, "timeIn");
  };

  return (
    <div>
      <Head>
        <title>Cadprime System</title>
      </Head>
      <main className="flex flex-col flex-wrap items-center w-full h-screen bg-gray-300">
        <div
          className={`flex items-center bg-gray-100 w-full py-2 px-5 ${
            !session && `flex-grow`
          }`}
        >
          {session && (
            <>
              <img
                className="rounded-full w-12 object-contain"
                src={session?.user.image}
                alt="Profile pic"
              />
              <div className="flex-grow flex flex-col ml-3">
                <p className="text-sm">{session?.user.email}</p>
                <p className="text-md text-yellow-800">
                  {session ? `Hello ${session?.user.name}` : "Sign in"}
                </p>
              </div>
            </>
          )}

          {session ? (
            <button
              className="py-2 px-6 rounded-full text-white bg-red-600 hover:bg-red-400"
              onClick={signOut}
            >
              Logout
            </button>
          ) : (
            <button
              className="py-2 mx-auto px-6 rounded-full text-white bg-yellow-600 hover:bg-yellow-400"
              onClick={signIn}
            >
              Sign in
            </button>
          )}
        </div>
        {session && (
          <div className="my-10">
            {!btnStatus ? (
              <button
                className="py-2 px-6 rounded-full text-white bg-blue-600 hover:bg-blue-400"
                onClick={addTime}
              >
                Time in
              </button>
            ) : (
              <button
                className="py-2 px-6 rounded-full text-white bg-yellow-600 hover:bg-yellow-400"
                onClick={addTime}
              >
                Time Out
              </button>
            )}
          </div>
        )}

        {timeIn.length > 0 && (
          <div className="flex-grow">
            <table className="table-fixed p-5">
              <thead>
                <tr>
                  <th className="w-80 text-left">Name</th>
                  <th className="">Time</th>
                </tr>
              </thead>
              <tbody>
                {timeIn.map((time) => (
                  <tr>
                    <td>{!time.btnStatus ? "Time in" : "Time Out"}</td>
                    <td>{time.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
