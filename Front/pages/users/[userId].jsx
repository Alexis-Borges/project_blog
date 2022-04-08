import Header from "../../src/components/Header.jsx"
import api from "../../src/components/services/api.js"
import { useCallback, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import AppContext from "../../src/components/AppContext"

const userId = () => {
  const { session } = useContext(AppContext)
  const [role, setRole] = useState(null)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(null)

  const {
    query: { userId },
  } = useRouter()

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

  useEffect(() => {
    if (userId) {
      api
        .get(`/users/${userId}/posts`)
        .then((response) => setPosts(response.data))
    }
  }, [userId])

  if (!user || !role || !posts) {
    return <div>Loading</div>
  }

  return (
    <>
      <div>
        <Header />
        <main className="w-9/12  mx-auto">
          <section>
            <div className="flex items-end justify-center mb-10">
              <div className="w-3/4">
                <p className="pt-4 pb-2 p-5 text-4xl border-b-2 rounded-xl">
                  DisplayName: {user.displayName}
                </p>
                <p className="pt-4 w-3/4 pb-2 p-5 text-4xl border-b-2 rounded-xl">
                  Email: {user.email}
                </p>
                <p className="pt-4 w-2/6 pb-2 p-5 text-4xl  border-b-2 rounded-xl">
                  Role: {role.name}
                </p>
              </div>
            </div>
            <div className="mb-10 w-max mx-auto">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-16 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-1000 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Modify Your Details
                </span>
              </button>
              <button class=" relative inline-flex items-center justify-center p-0.5 mb-2 ml-8 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-fuchsia-500 to-purple-500 group-hover:from-fuchsia-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span class=" relative px-5 py-2.5 transition-all ease-in duration-1000 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Delete Your Account
                </span>
              </button>
            </div>
          </section>
          <section className="w-10/12 mx-auto">
            <div className="flex items-center justify-center p-5 text-3xl font-bold ">
              Your Latest Posts
            </div>
            <ul className="flex justify-between flex-col px-10 mx-auto p-2 rounded-xl w-3/4"></ul>
            {posts.map((item) => (
              <>
                <li className="mb-4 break-all list-none p-6 border-4 border-y-black border-x-transparent">
                  <a className="text-4xl  font-bold hover:text-blue-300 mb-4 mt-2 cursor-pointer">
                    {item.title}
                  </a>
                  <p className="mb-4 mt-2 overflow-visible">{item.content}</p>
                  <div className="mb-4 mt-2 ">
                    On The {new Date(item.publicationDate).toLocaleDateString()}
                  </div>
                </li>
              </>
            ))}
          </section>
        </main>
      </div>
    </>
  )
}
export default userId
