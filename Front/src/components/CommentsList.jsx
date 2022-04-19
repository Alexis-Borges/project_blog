import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import AppContext from "./AppContext.jsx"
import api from "../components/services/api.js"
import CreateCommentForm from "../components/CreateCommentForm.jsx"

const formatDate = (date) => {
  return (date = new Date(date).toLocaleDateString())
}

const CommentsList = ({ postsId, postUserId }) => {
  const { session } = useContext(AppContext)
  const [comments, setComments] = useState(null)

  let sessionId = null
  let userRoleId = null

  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  useEffect(() => {
    if (postsId) {
      api
        .get(`posts/${postsId}/comments`)
        .then((response) => setComments(response.data))
    }
  }, [postsId])

  if (!comments) {
    return (
      <section className="border-4 border-x-black border-y-transparent mb-10 pb-10 rounded-b">
        <h3 className="flex items-center justify-center mb-10 py-5 bg-red-800 rounded-t text-3xl font-bold">
          Comments
        </h3>
      </section>
    )
  }

  if (!comments.length) {
    return (
      <section className="w-full mx-auto">
        <CreateCommentForm postsId={postsId} />
        <div className="flex items-center flex-col justify-center py-5 text-2xl font-bold">
          <h3 className="text-3xl mb-4 break-all p-6 border-4 border-x-black border-y-transparent">
            The Comment(s) Of The Post
          </h3>
          <p className=" mb-4 break-all p-6 border-4 border-x-black border-y-transparent">
            Nothing There For The Moment 👨🏻‍🦯
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full mx-auto">
      <CreateCommentForm postsId={postsId} />
      <div className=" flex items-center flex-col justify-center py-5 text-2xl font-bold">
        <h3 className="text-3xl mb-4 break-all p-6">
          The Comment(s) Of The Post
        </h3>
        <ul className="flex justify-between flex-col px-10 mx-auto p-5 rounded-xl w-3/4">
          {comments.map((item) => (
            <li
              key={item.id}
              className="text-3xl mb-4 break-all p-6 border-4 border-x-black border-y-transparent"
            >
              <p className="mb-3 font-bold">
                {item.author ? (
                  <Link href={`/users/${encodeURIComponent(item.user_id)}`}>
                    <a className="font-black">{item.author}</a>
                  </Link>
                ) : (
                  <span className="underline ">Deleted user</span>
                )}{" "}
                commented on <span>{formatDate(item.publicationDate)}</span>
              </p>
              <Link href={`/comments/${encodeURIComponent(item.id)}`}>
                <a>
                  <p className="text-justify w-full hover:bg-blue-200">
                    {item.content}
                  </p>
                </a>
              </Link>
              {item.user_id == sessionId ||
              postUserId == sessionId ||
              userRoleId == 3
                ? null
                : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CommentsList
