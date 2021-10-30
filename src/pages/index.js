import React, { useState } from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { addTimeIn, selectTimeIn } from "../slices/timeInSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/NavBar";

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
      <NavBar />
      <main className="flex flex-col flex-wrap items-center w-full h-screen bg-gray-300">
        {session && timeIn.length > 0 && (
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
