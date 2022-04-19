import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import api from "../../src/components/services/api"
import ModifyCommentForm from "../../src/components/ModifyCommentForm.jsx"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentData = ({ commentId }) => {
  const { session, router } = useContext(AppContext)
  const [comment, setComment] = useState(null)
  const [isModified, setIsModified] = useState(false)

  let sessionId = null
  let userRoleId = null

  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  const deleteComment = async () => {
    await api.delete(`/comments/${commentId}`)
    router.back()
  }

  useEffect(() => {
    if (commentId && !isNaN(commentId)) {
      api
        .get(`/comments/${commentId}`)
        .then((response) => setComment(response.data))
    }
  }, [commentId])

  if (!comment) {
    return <section>Loading</section>
  }

  return (
    <section className="w-full mx-auto">
      {!isModified ? (
        <div className="flex justify-between flex-col px-10 mx-auto p-5 w-3/4 mb-4 break-all border-4 border-y-black border-x-transparent">
          <p className="text-3xl font-bold mb-4 mt-2">
            {comment.author ? (
              <Link href={`/users/${encodeURIComponent(comment.user_id)}`}>
                <a className="mb-4 mt-2">{comment.author}</a>
              </Link>
            ) : (
              <span className="mb-4 mt-2">Deleted user</span>
            )}{" "}
            commented on <span>{formatDate(comment.publicationDate)}</span>
          </p>
          <p className="mb-4 mt-2 text-4xl overflow-visible">
            {comment.content}
          </p>
        </div>
      ) : (
        <ModifyCommentForm commentId={commentId} />
      )}

      {!isModified ? (
        comment.user_id == sessionId ||
        comment.postAuthorId == sessionId ||
        userRoleId == 3 ? (
          <section className="w-max mb-6 mx-auto">
            {comment.user_id == sessionId ? (
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-16 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => setIsModified(true)}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-700 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Modify comment
                </span>
              </button>
            ) : null}
            <button
              className="relative mt-8 inline-flex items-center justify-center p-0.5 mb-2 ml-8 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-fuchsia-500 to-purple-500 group-hover:from-fuchsia-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              onClick={deleteComment}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-700 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Delete comment
              </span>
            </button>
          </section>
        ) : null
      ) : (
        <section className="w-max mb-10 mx-auto">
          <button
            className="text-black mt-2 ml-8 text-lg border-2 border-x-black border-y-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
            onClick={() => setIsModified(false)}
          >
            Undo The Changes ♻️
          </button>
        </section>
      )}
    </section>
  )
}

export default CommentData
