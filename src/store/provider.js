'use client'

import { SessionProvider } from "next-auth/react"
import { Provider as ReduxProvider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/authSlice"

export default function Provider({ children, initialState = {} }) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  })

  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  )
}