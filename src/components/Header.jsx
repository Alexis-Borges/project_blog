import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between px-10 mx-auto m-4 p-5 rounded-xl w-3/4 ">
      <Link href="/">
        <a className="font-bold text-4xl">BLOG PROJECT</a>
      </Link>
      <nav className="text-2xl">
        <Link href="/sign_up">
          <a className="p-2 hover:bg-gray-300 rounded-xl m-2">Sign-Up</a>
        </Link>
        <Link href="/sign_in">
          <a className="p-2 hover:bg-gray-300 rounded-xl m-2">Sign-In</a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
