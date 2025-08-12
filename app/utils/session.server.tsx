import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { request } from "express";
import { config } from "~/lib/lib";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secure: process.env.NODE_ENV === "production",
        secrets: [config.SESSION_SECRET || "dev_secret"],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

export const getSession = async (request: Request) => {
    return sessionStorage.getSession(request.headers.get("Cookie"))
}

export const requireUserSession = async (request: Request) => {
    const session = await getSession(request)
    const userId = session.get("userId")

    if (!userId) {
        throw redirect("/login")
    }

    return userId
}

export const createUserSession = async (userId: string, redirectTo: string) => {
    const session = await sessionStorage.getSession()
    session.set("userId", userId)

    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session)
        }
    })
}

export const destroyUserSession = async (request: Request) => {
    const session = await getSession(request)
    return redirect("/login", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session)
        }
    })
}