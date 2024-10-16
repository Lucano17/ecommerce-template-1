"use client"

import { logout } from "./logout"

export const onLogout = async() => {
    await logout()
    window.location.replace('/')
}