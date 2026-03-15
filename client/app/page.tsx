"use client";
import { axiosInstance } from "@/utils/axios";

import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

const soapRequestToGetAllUsers = `
  <soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <listUsersRequest>
      </listUsersRequest>
    </soap:Body>
  </soap:Envelope>
`;

export default function Home() {
  const [users, setUsers] = useState([]);

  const getUsersHandler = async () => {
    const res = await axiosInstance.post("/", soapRequestToGetAllUsers);
    const parseResult = await parseStringPromise(res.data);
    const users = parseResult["soap:Envelope"]["soap:Body"][0][
      "listUsersResponse"
    ][0]["user"].map((u) => ({
      name: u.name[0],
      age: u.age[0],
      email: u.email[0],
    }));
    setUsers(users);
  };

  console.log(users);

  useEffect(() => {
    getUsersHandler();
  }, []);

  return (
    <>
      <button
        onClick={getUsersHandler}
        className="px-5 py-2.5 bg-amber-600 rounded-full"
      >
        201 GET ALL USERS
      </button>
    </>
  );
}
