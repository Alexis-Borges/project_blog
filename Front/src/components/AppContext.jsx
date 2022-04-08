import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props

  const [session, setSession] = useState()

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)

      return
    }

    const [, payload] = jwt.split(".")
    const session = atob(payload)

    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  useEffect(() => {
    if (session === null && Page.private) {
      router.push(`/sign-in?redirect=${encodeURIComponent(location.pathname)}`)
    }
  }, [Page.private, router, session])

  useEffect(() => {
    if (session !== null && session !== undefined && Page.noSessionOnly) {
      router.push("/")
    }
  }, [Page.noSessionOnly, Page.private, router, session])

  const signIn = useCallback(
    async (email, password) => {
      try {
        const {
          data: { jwt },
        } = await api.post("/sign-in", { email, password })

        localStorage.setItem("jwt", jwt)
        initSession(jwt)
        router.push("/")
      } catch (err) {
        alert(err.response.data.error)
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (displayName, email, password) => {
      try {
        await api.post("/sign-up", { displayName, email, password })
        router.push("/sign-in")
      } catch (err) {
        alert(err.response.data.error)
      }
    },
    [router]
  )

  const signOut = () => {
    localStorage.clear()
    setSession(null)
    router.push("/sign-in")
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        router,
        session,
        signIn,
        signUp,
        signOut,
      }}
    />
  )
}

export default AppContext
