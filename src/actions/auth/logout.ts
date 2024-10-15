"use server"

import { signOut } from "@/auth.config"

export const logout = async() => {
    await signOut()
}

export const onLogout = async() => {
    await logout()
    window.location.replace('/')
}