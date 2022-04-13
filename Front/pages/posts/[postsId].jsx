import { useRouter } from "next/router"
import PostData from "./PostData.jsx"
import Header from "../../src/components/Header.jsx"

const PostPage = () => {
  const {
    query: { postsId },
  } = useRouter()

  return (
    <>
      <Header />
      <PostData postsId={postsId} />
    </>
  )
}

PostPage.private = true

export default PostPage
