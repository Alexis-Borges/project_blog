import { useRouter } from "next/router"
import PostInfo from "./PostInfo.jsx"
import Header from "../../src/components/Header.jsx"

const PostPage = () => {
  const {
    query: { postsId },
  } = useRouter()

  return (
    <>
      <Header />
      <PostInfo postsId={postsId} />
    </>
  )
}

PostPage.private = true

export default PostPage
