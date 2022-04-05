/*
import Header from "../../src/components/Header.jsx"
import api from "../../src/components/services/api.js"
import { useCallback, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import AppContext from "../../src/components/AppContext"

const userId = () => {
  const {
    query: { userId },
  } = useRouter()

  const [roles, setRoles] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    api.get("/roles").then((response) => setRoles(response.data))
  }, [])

  useEffect(() => {
    api.get(`/users/${userId}`).then((response) => setUser(response.data))
  }, [])

  const { session } = useContext(AppContext)
  let pseudo = null
  let email = null

  if (session) {
    pseudo = JSON.parse(session).payload.user.displayName
    email = JSON.parse(session).payload.user.email
  }

  return (
    <>
      <div>
        <Header />
        <main className="w-9/12 mx-auto">
          <section>
            <div className="flex items-end justify-center mb-10">
              <div className="w-2/3 text-black">
                <p> {user.pseudo} </p>
                <p> {user.email} </p>
                {roles.map((item) => (
                  <p> {item.name} </p>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
export default userId */
