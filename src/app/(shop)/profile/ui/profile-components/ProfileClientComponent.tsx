"use client";

import React, { useState, useEffect } from "react";
import styles from "../ProfileData.module.css";
import { FaEdit, FaRegSave } from "react-icons/fa";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export const ProfileClientComponent = () => {
  const [session, setSession] = useState<Session | null>(null);

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const userSession = async () => {
      const session = await auth();
      if (!session?.user) {
        // redirect('/auth/login?returnTo=/perfil')
        redirect("/");
      } else {
        setSession(session); // Guardar la sesión en el estado
      }
    };

    userSession();
  }, []);

  // Mientras se obtiene la sesión, puedes mostrar un mensaje de carga
  if (!session) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      <input type="image" className={styles.image} />

      {editMode.name ? (
        <div className={styles.singleDataContainer}>
          <h3>Nombre de usuario:</h3>
          <div className={styles.userData}>
            <input>{session.user.name}</input>
            <button>
              <FaRegSave />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.singleDataContainer}>
            <h3>Nombre de usuario:</h3>
            <div className={styles.userData}>
              <p>{session.user.name}</p>
              <button>
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode.email ? (
        <div className={styles.singleDataContainer}>
          <h3>Correo electrónico</h3>
          <div className={styles.userData}>
            <input>{session.user.email}</input>
            <button>
              <FaRegSave />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.singleDataContainer}>
            <h3>Correo electrónico</h3>
            <div className={styles.userData}>
              <p>{session.user.email}</p>
              <button>
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      )}

      {editMode.password ? (
        <div className={styles.singleDataContainer}>
          <h3>Nombre de usuario</h3>
          <div className={styles.userData}>
            <input></input>
            <button>
              <FaRegSave />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.singleDataContainer}>
            <h3>Nombre de usuario:</h3>
            <div className={styles.userData}>
              <p></p>
              <button>
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.singleDataContainer}>
        <h3>Rol de usuario:</h3>
        <div className={styles.userData}>
          <p>{session.user.role}</p>
        </div>
      </div>
    </div>
  );
};
