import { useCallback, useContext } from "react"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../components/AppContext.jsx"
import api from "./services/api.js"

const displayErrorMes = Yup.object().shape({
  content: Yup.string()
    .max(500, "Max 500 characters")
    .required("Required field"),
})

const CreateCommentForm = ({ postsId }) => {
  const { router, session } = useContext(AppContext)
  let userId = null

  if (session) {
    userId = JSON.parse(session).payload.user.userId
  }

  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await api.post(`/users/${userId}/posts/${postsId}/comments`, {
        content,
      })
      router.reload()
    },
    [postsId, router, userId]
  )
  console.log(postsId)

  return (
    <section className="w-full mx-auto">
      <div className="flex items-center justify-center py-5 text-3xl font-bold flex-col px-10 mx-auto p-5 rounded-xl w-3/4 ">
        <h2 className="flex items-center justify-center text-3xl mb-4 font-bold">
          ✍️ Create Your Comment
        </h2>
        <Formik
          initialValues={{
            content: "",
          }}
          validationSchema={displayErrorMes}
          onSubmit={handleFormSubmit}
        >
          {({ errors }) => (
            <Form className="w-full p-6 border-4 border-x-black border-y-transparent">
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                as="textarea"
                type="textarea"
                name="content"
                placeholder="Write Your Comment Here "
                rows="4"
                errortype={errors.content}
              />
              <button
                className="text-black mt-2 ml-8 text-lg border-2 border-y-black border-x-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
                type="submit"
              >
                Post Your Comment 🚀
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default CreateCommentForm
