import Head from "next/head"
import Header from "../src/components/Header"
import PostList from "../src/components/PostList"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Chill'in'Blog </title>
        <meta name="description" />
        <link rel="icon" href="/mTSLA.ico" />
      </Head>
      <Header />
      <PostList />
    </div>
  )
}

export default Home
