"use client"

import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { store } from "./store"

export default function CustomProvider({ children, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  )
}