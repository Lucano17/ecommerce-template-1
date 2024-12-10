"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/interfaces";
import styles from "./UsersTable.module.css";
import { changeUserRole } from "@/actions";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>E-mail</th>
            <th>Nombre completo</th>
            <th>Rol de usuario</th>
            <th>Ver órdenes</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id.split("-").at(-1)}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                <select
                    value={user.role}
                    onChange={e => changeUserRole(user.id, e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                </select>
              </td>
              <td>
                <Link href={`/orders/${user.id}`}>Ver órdenes</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
