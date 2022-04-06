import { useState, useEffect } from "react"
import api from "./services/api"

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data))
  }, [])
  return (
    <>
      <section className="w-full mx-auto">
        <div className="flex items-center justify-center py-5 text-3xl font-bold ">
          The Latest Posts
        </div>
        <ul className="flex justify-between flex-col px-10 mx-auto p-5 rounded-xl w-3/4">
          {posts.map((item) => (
            <li className="mb-4 break-all p-6 border-4 border-y-black border-x-transparent">
              <a className="text-4xl  font-bold hover:text-blue-300 mb-4 mt-2 cursor-pointer">
                {item.title}
              </a>
              <p className="mb-4 mt-2 overflow-visible">{item.content}</p>
              <div className="mb-4 mt-2 ">
                On The {new Date(item.publicationDate).toLocaleDateString()}
              </div>
              {item.author ? (
                <a className="mb-4 mt-2 cursor-pointer">By {item.author}</a>
              ) : (
                <div className="mb-4 mt-2 cursor-pointer">By Deleted User</div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostList
