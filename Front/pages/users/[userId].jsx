import Header from "../../src/components/Header.jsx"
import api from "../../src/components/services/api.js"
import { useCallback, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import AppContext from "../../src/components/AppContext"

const userId = () => {
  const { session } = useContext(AppContext)
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)

  const {
    query: { userId },
  } = useRouter()

  console.log(userId)

  useEffect(() => {
    if (userId) {
      api.get(`/users/${userId}`).then((response) => setUser(response.data))
    }
  }, [userId])

  useEffect(() => {
    if (user) {
      api
        .get(`/roles/${user.role_id}`)
        .then((response) => setRole(response.data))
    }
  }, [user])

  if (role) {
    console.log(role.name)
  }

  if (!user || !role) {
    return <div>Loading</div>
  }

  return (
    <>
      <div>
        <Header />
        <main className="w-9/12 mx-auto">
          <section>
            <div className="flex items-end justify-center mb-10">
              <div className="w-2/3 text-black">
                <p> {user.displayName} </p>
                <p> {user.email} </p>
                <p> {role.name} </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
export default userId
