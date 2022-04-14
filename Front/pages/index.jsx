import Head from "next/head"
import Header from "../src/components/Header"
import PostList from "../src/components/PostList"
import CreatePost from "../src/components/CreatePost.jsx"
import AppContext from "../src/components/AppContext"
import { useContext } from "react"

const Home = () => {
  const { session } = useContext(AppContext)

  let userRoleId = null

  if (session) {
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  return (
    <div>
      <Head>
        <title>Chill'in'Blog </title>
        <meta name="description" />
        <link rel="icon" href="/mTSLA.ico" />
      </Head>
      <Header />
      {!session ? (
        <div className="text-white text-3xl text-center pt-8 mb-10">
          Welcome in the chillest Blog ever created 🧊 <br />
          To start or continue your Experience create an account ou connect yourself
        </div>
      ) : null}
      {userRoleId && userRoleId > 1 ? <CreatePost /> : null}
      <PostList />
    </div>
  )
}

export default Home
