import { useCallback, useContext } from "react"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../components/AppContext.jsx"
import api from "./services/api.js"

const displayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string()
    .max(500, "Must be at most 500 characters")
    .required("Required field"),
})

const CreateCommentForm = ({ postsId }) => {
  const { router, session } = useContext(AppContext)
  let sessionId = null

  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
  }

  const handleFormSubmit = useCallback(
    async ({ content }) => {
      await api.post(`/users/${sessionId}/posts/${postsId}/comments`, {
        content,
      })
      router.reload()
    },
    [postsId, router, sessionId]
  )

  return (
    <section className="mb-10 border-2 border-pink-700 rounded shadow">
      <div className="px-10 pt-6">
        <h2 className="text-4xl text-white font-bold mb-5">
          ⬇⬇ Create comment ⬇⬇
        </h2>
        <Formik
          initialValues={{
            content: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                type="textarea"
                name="content"
                placeholder="Content of comment"
                rows="4"
                errorType={errors.content}
                touchedType={touched.content}
              />
              <button
                className="bg-pink-500 text-white mt-2 mb-6 text-lg font-bold border px-4 py-2 rounded hover:bg-pink-300 focus:outline focus:outline-3 focus:outline-pink-300  transition-all hover:scale-105"
                type="submit"
              >
                Create comment
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default CreateCommentForm
