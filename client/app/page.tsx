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
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              CRUD Operations UI
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Simple users management interface for Next.js with Tailwind CSS.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Create / Update User
                </h2>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  UI Only
                </span>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200">
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Designer</option>
                    <option>Manager</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700"
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      Inactive
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    About
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write short description..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    Save User
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Users Table
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Read, edit, and delete users from this table.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          User
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Role
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Age
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>
                        <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                      {[
                        {
                          name: "Ali Valiyev",
                          email: "ali@example.com",
                          role: "Frontend Developer",
                          age: 24,
                          status: "Active",
                        },
                        {
                          name: "Sara Johnson",
                          email: "sara@example.com",
                          role: "Backend Developer",
                          age: 29,
                          status: "Inactive",
                        },
                        {
                          name: "John Smith",
                          email: "john@example.com",
                          role: "Designer",
                          age: 31,
                          status: "Active",
                        },
                        {
                          name: "Maya Brown",
                          email: "maya@example.com",
                          role: "Manager",
                          age: 35,
                          status: "Active",
                        },
                      ].map((user) => (
                        <tr key={user.email} className="hover:bg-slate-50/80">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                                {user.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">
                                  {user.name}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-700">
                            {user.role}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {user.age}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                user.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-700"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">Showing 4 of 24 users</p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
