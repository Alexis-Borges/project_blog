import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../components/AppContext.jsx"
import api from "../components/services/api.js"

const displayErrorMes = Yup.object().shape({
  title: Yup.string()
    .max(100, "Max 100 characters 📌")
    .required("Field Required 🚨"),
  content: Yup.string()
    .max(1000, "Max 1000 characters 📌")
    .required("Field Required 🚨"),
})

const ModifyPostForm = ({ postsId }) => {
  const { router } = useContext(AppContext)
  const [post, setPost] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await api.put(`/posts/${postsId}`, { title, content })
      router.reload()
    },
    [postsId, router]
  )

  useEffect(() => {
    if (postsId && !isNaN(postsId)) {
      api.get(`/posts/${postsId}`).then((response) => setPost(response.data))
    }
  }, [postsId])

  if (!post) {
    return <a> loading </a>
  }

  return (
    <section className="w-full mx-auto">
      <div className="flex items-center justify-center py-5 text-3xl font-bold flex-col px-10 mx-auto p-5 rounded-xl w-3/4">
        <h2 className="flex items-center justify-center text-3xl mb-4 font-bold">
          ✍️ Modify The Post
        </h2>
        <Formik
          initialValues={{
            title: post.title,
            content: post.content,
          }}
          validationSchema={displayErrorMes}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full p-6 border-4 border-x-black border-y-transparent">
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                id="title"
                name="title"
                placeholder="Title of post"
              />
              {touched.title && errors.title && (
                <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                  {touched.title && errors.title}
                </div>
              )}
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                as="textarea"
                label="Content"
                type="textarea"
                id="content"
                name="content"
                placeholder="Content of post"
                rows="6"
              />
              {touched.content && errors.content && (
                <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                  {touched.content && errors.content}
                </div>
              )}
              <button
                className="text-black mt-2 ml-8 text-lg border-2 border-y-black border-x-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
                type="submit"
              >
                Confirm The Modifications 📫
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ModifyPostForm
