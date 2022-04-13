import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../src/components/AppContext"
import api from "../../src/components/services/api"
//import ModifyCommentForm from "../../src/components/ModifyPostForm"

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
        .catch((error) =>
          setApiError(
            error.response ? error.response.data.error : error.message
          )
        )
    }
  }, [commentId])

  return (
    <section>
      {!isModified ? (
        <div className="">
          <p className="">
            {comment.author ? (
              <Link href={`/users/${encodeURIComponent(comment.user_id)}`}>
                <a className="">
                  {comment.author}
                </a>
              </Link>
            ) : (
              <span className="">Deleted user</span>
            )}{" "}
            commented on <span>{formatDate(comment.publicationDate)}</span>
          </p>
          <p className="">{comment.content}</p>
        </div>
      ) : (
        <ModifyCommentForm commentId={commentId} />
      )}

      {!isModified ? (
        comment.user_id == sessionId ||
        comment.postAuthorId == sessionId ||
        userRoleId == 3 ? (
          <section className="">
            {comment.user_id == sessionId ? (
              <button
                className=""
                onClick={() => setIsModified(true)}
              >
                Modify comment
              </button>
            ) : null}
            <button
              className=""
              onClick={deleteComment}
            >
              Delete comment
            </button>
          </section>
        ) : null
      ) : (
        <section className="">
          <button
            className=""
            onClick={() => setIsModified(false)}
          >
            Undo change
          </button>
        </section>
      )}
    </section>
  )
}

export default CommentData
