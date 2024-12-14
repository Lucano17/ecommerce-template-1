"use client";

import React, { useEffect, useState } from "react";
import styles from "../ProfileData.module.css";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { userUpdate } from "@/actions/auth/update-user";

interface User {
  name: string;
  email: string;
  role: string;
}

interface ProfileClientComponentProps {
  user: User;
}

export const ProfileClientComponent: React.FC<ProfileClientComponentProps> = ({ user }) => {
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async (field: "name" | "email" | "password") => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email, // Siempre envía el email para identificar al usuario
          name: field === "name" ? formData.name : undefined,
          password: field === "password" ? formData.password : undefined,
        }),
      });
  
      if (!response.ok) {
        console.error("Error al guardar los cambios");
        return;
      }
  
      const updatedUser = await response.json();
      console.log("Usuario actualizado:", updatedUser);
  
      // Desactiva el modo edición
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={styles.container}>
      {/* Nombre de usuario */}
      <div className={styles.singleDataContainer}>
        <h3>Nombre de usuario:</h3>
        <div className={styles.userData}>
          {editMode.name ? (
            <>
              <input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <button onClick={() => saveChanges("name")}>
                <FaRegSave />
              </button>
            </>
          ) : (
            <>
              <p>{formData.name}</p>
              <button onClick={() => setEditMode((prev) => ({ ...prev, name: true }))}>
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Correo electrónico */}
      <div className={styles.singleDataContainer}>
        <h3>Correo electrónico:</h3>
        <div className={styles.userData}>
          {editMode.email ? (
            <>
              <input
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <button onClick={() => saveChanges("email")}>
                <FaRegSave />
              </button>
            </>
          ) : (
            <>
              <p>{formData.email}</p>
              <button onClick={() => setEditMode((prev) => ({ ...prev, email: true }))}>
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Contraseña */}
      <div className={styles.singleDataContainer}>
        <h3>Contraseña:</h3>
        <div className={styles.userData}>
          {editMode.password ? (
            <>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button onClick={() => saveChanges("password")}>
                <FaRegSave />
              </button>
            </>
          ) : (
            <>
              <p>********</p>
              <button onClick={() => setEditMode((prev) => ({ ...prev, password: true }))}>
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Rol */}
      <div className={styles.singleDataContainer}>
        <h3>Rol de usuario:</h3>
        <div className={styles.userData}>
          <p>{user.role}</p>
        </div>
      </div>
    </div>
  );
};
