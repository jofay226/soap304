"use client";
import axios from "axios";
import { useEffect } from "react";

const soapRequestToGetAllUsers = `
  <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <listUsersRequest>
      </listUsersRequest>
    </soap:Body>
  </soap:Envelope>
`;

export default function Home() {
  const getUsersHandler = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/soap",
      soapRequestToGetAllUsers,
      {
        headers: {
          "Content-Type": "text/xml",
        },
      },
    );
    console.log(res);
  };

  useEffect(() => {
    getUsersHandler();
  }, []);

  return (
    <>
      <button
        onClick={getUsersHandler}
        className="px-5 py-2.5 bg-amber-600 rounded-full"
      >
        GET ALL USERS
      </button>
    </>
  );
}
