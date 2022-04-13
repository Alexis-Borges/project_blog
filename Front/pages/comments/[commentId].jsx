import { useRouter } from "next/router"
import CommentData from "./CommentData.jsx"
import Header from "../../src/components/Header.jsx"

const CommentPage = () => {
  const {
    query: { commentId },
  } = useRouter()

  return (
    <>
      <Header />
      <CommentData commentId={commentId} />
    </>
  )
}

CommentPage.private = true

export default CommentPage
