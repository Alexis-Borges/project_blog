import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import api from "../../src/components/services/api.js"
import AppContext from "../../src/components/AppContext"
import CommentsList from "../../src/components/CommentsList.jsx"
import ModifyPostForm from "../../src/components/ModifyPostForm.jsx"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const PostData = () => {
  const { session, router } = useContext(AppContext)
  const [post, setPost] = useState(null)
  const [isModified, setIsModified] = useState(false)

  const {
    query: { postsId },
  } = useRouter()

  let sessionId = null
  let userRoleId = null

  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  const deletePost = async () => {
    await api.delete(`/posts/${postsId}`)
    router.back()
  }

  useEffect(() => {
    if (postsId && !isNaN(postsId)) {
      api.get(`/posts/${postsId}`).then((response) => setPost(response.data))
    }
  }, [postsId])

  if (!post) {
    return <section>Loading</section>
  }

  return (
    <section className="w-full mx-auto">
      {!isModified ? (
        <div className="flex justify-between flex-col px-10 mx-auto p-5 w-3/4 mb-4 break-all border-4 border-y-black border-x-transparent">
          <p className="text-5xl font-bold mb-4 mt-2">{post.title}</p>
          <p className="mb-4 mt-2 text-black">
            by{" "}
            {post.author ? (
              <Link href={`/users/${encodeURIComponent(post.user_id)}`}>
                <a className="mb-4 mt-2 ">{post.author}</a>
              </Link>
            ) : (
              <span className="mb-4 mt-2 ">Deleted user</span>
            )}{" "}
            on <span>{formatDate(post.publicationDate)}</span>
          </p>
          <p className="mb-4 mt-2 text-4xl overflow-visible">{post.content}</p>
        </div>
      ) : (
        <ModifyPostForm postsId={postsId} />
      )}

      {!isModified ? (
        (post.user_id == sessionId || userRoleId == 3) && userRoleId != 1 ? (
          <div className="w-max mb-6 mx-auto">
            {post.user_id == sessionId ? (
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-16 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => setIsModified(true)}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-700 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Modify The Post
                </span>
              </button>
            ) : null}
            <button
              className=" relative mt-8 inline-flex items-center justify-center p-0.5 mb-2 ml-8 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-fuchsia-500 to-purple-500 group-hover:from-fuchsia-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              onClick={deletePost}
            >
              <span className=" relative px-5 py-2.5 transition-all ease-in duration-700 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Delete The Post
              </span>
            </button>
          </div>
        ) : null
      ) : (
        <div className="w-max mb-10 mx-auto">
          <button
            className="text-black mt-2 ml-8 text-lg border-2 border-x-black border-y-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
            onClick={() => setIsModified(false)}
          >
            Undo The Changes ♻️
          </button>
        </div>
      )}

      <CommentsList postsId={postsId} postUserId={post.user_id} />
    </section>
  )
}

export default PostData
