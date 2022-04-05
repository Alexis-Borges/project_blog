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
    <header className="flex justify-between items-center px-10 mx-auto m-4 p-5 rounded-xl w-3/4 ">
      <Link href="/">
        <a className="font-bold  text-4xl ">BLOGED AH GOT HIM</a>
      </Link>

      {session ? (
        <div className="flex">
          <Link href={`users/${id}`}>
            <a className="text-3xl text-black p-8">{pseudo} </a>
          </Link>

          <button onClick={signOut}>
            <BiExit className="text-6xl text-black hover:bg-red-500 rounded-xl" />
          </button>
        </div>
      ) : (
        <nav className="text-2xl">
          <Link href="/sign-up">
            <a className="p-2 hover:bg-blue-300 rounded-xl m-2">Sign-Up</a>
          </Link>
          <Link href="/sign-in">
            <a className="p-2 hover:bg-blue-300 rounded-xl m-2">Sign-In</a>
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
