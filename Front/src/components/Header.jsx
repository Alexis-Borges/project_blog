import Link from "next/link"
import AppContext from "./AppContext"
import { useContext } from "react"
import { BiExit } from "react-icons/bi"

const Header = () => {
  const { session, signOut } = useContext(AppContext)
  let pseudo = null
  let id = null
  if (session) {
    pseudo = JSON.parse(session).payload.user.displayName
    id = JSON.parse(session).payload.user.userId
  }
  return (
    <header className="flex justify-between items-center px-10 mx-auto m-7 p-5 rounded-xl w-3/4 ">
      <Link href="/">
        <a className="font-bold text-4xl ">Chill'in'Blog🌴⛱️ </a>
      </Link>

      {session ? (
        <div className="flex">
          <Link href={`users/${id}`}>
            <a className="text-4xl m-5">{pseudo} </a>
          </Link>

          <button onClick={signOut}>
            <BiExit className="text-6xl rounded-xl bg-gradient-to-r hover:from-red-600 hover:to-red-400 " />
          </button>
        </div>
      ) : (
        <nav className="text-2xl">
          <Link href="/sign-up">
            <a className="p-2 rounded-xl m-2 bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500">
              Sign-Up
            </a>
          </Link>
          <Link href="/sign-in">
            <a className="p-2 bg-gradient-to-r hover:from-fuchsia-700 hover:to-pink-500 rounded-xl m-2">
              Sign-In
            </a>
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
