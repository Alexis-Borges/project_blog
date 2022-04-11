import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../../src/components/services/api.js"
import AppContext from "../../src/components/AppContext"
//import CommentsList from "../../components/body/lists/CommentsList"
//import ModifyPostForm from "../../components/body/forms/ModifyPostForm"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const PostInfo = () => {
  const { session, router } = useContext(AppContext)
  const [post, setPost] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isModified, setIsModified] = useState(false)
  let sessionId = null
  let userRoleId = null

  const {
    query: { postId },
  } = useRouter()

  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  const deletePost = async () => {
    await api.delete(`/posts/${postId}`)
    router.back()
  }

  useEffect(() => {
    if (postId) {
      api
        .get(`/posts/${postId}`)
        .then((response) => setPost(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [postId])
  console.log(postId)

  if (!post) {
    return <section>Loading</section>
  }

  return (
    <section>
      {!isModified ? (
        <div className="mb-8 break-all p-10 border-2 border-pink-700 rounded">
          <p className="text-4xl text-white font-bold">{post.title}</p>
          <p className="mb-4 mt-1 text-white">
            by{" "}
            {post.author ? (
              <Link href={`/users/${encodeURIComponent(postId)}`}>
                <a className="font-bold underline hover:text-pink-500">
                  {post.author}
                </a>
              </Link>
            ) : (
              <span className="font-bold underline">Deleted user</span>
            )}{" "}
            on <span>{formatDate(post.publicationDate)}</span>
          </p>
          <p className="text-white text-justify w-full">{post.content}</p>
        </div>
      ) : (
        <ModifyPostForm postId={postId} />
      )}

      {!isModified ? (
        (postId == sessionId || userRoleId == 3) && userRoleId != 1 ? (
          <div className="w-max mb-10 mx-auto">
            {postId == sessionId ? (
              <button
                className="bg-pink-500 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300 transition-all hover:scale-105"
                onClick={() => setIsModified(true)}
              >
                Modify post
              </button>
            ) : null}
            <button
              className="bg-red-700 text-white mt-2 ml-2 text-lg font-bold border px-4 py-2 rounded  hover:bg-red-400 focus:outline focus:outline-3 focus:outline-red-400 transition-all hover:scale-105"
              onClick={deletePost}
            >
              Delete post
            </button>
          </div>
        ) : null
      ) : (
        <div className="w-max mb-10 mx-auto">
          <button
            className="bg-red-700 text-white mt-2 mr-2 text-lg font-bold border px-4 py-2 rounded hover:bg-red-400 focus:outline focus:outline-3 focus:outline-red-400 transition-all hover:scale-105"
            onClick={() => setIsModified(false)}
          >
            Undo change
          </button>
        </div>
      )}

      <CommentsList postId={postId} postUserId={post.user_id} />
    </section>
  )
}
export default PostInfo
