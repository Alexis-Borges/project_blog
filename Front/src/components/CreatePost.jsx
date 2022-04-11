import { useCallback, useContext } from "react"
import { Formik, Field, Form, ResetForm } from "formik"
import * as Yup from "yup"
import AppContext from "./AppContext"
import api from "./services/api"

const displayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Must be at most 100 characters")
    .required("Required field"),
  content: Yup.string()
    .max(1000, "Must be at most 1000 characters")
    .required("Required field"),
})

const CreatePost = () => {
  const { router, session } = useContext(AppContext)
  let id = null

  if (session) {
    id = JSON.parse(session).payload.user.userId
  }

  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await api.post(`/users/${id}/posts`, { title, content })
      router.reload()
    },
    [router, id]
  )

  return (
    <section className="w-full mx-auto">
      <div className="flex items-center justify-center py-5 text-3xl font-bold flex-col px-10 mx-auto p-5 rounded-xl w-3/4 ">
        <h2 className="flex items-center justify-center text-3xl mb-4 font-bold ">
          Create Your Post
        </h2>
        <Formik
          initialValues={{
            title: "",
            content: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full p-6 border-4 border-x-black border-y-transparent">
              <p> Title </p>
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                label="Title"
                id="title"
                name="title"
                placeholder="Title Of The Post"
                errortype={errors.title}
                touchedtype={touched.title}
              />
              <p> Content </p>
              <Field
                as="textArea"
                className=" w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                label="Content"
                type="textarea"
                id="content"
                name="content"
                placeholder="Content Of The Post"
                rows="6"
                errortype={errors.content}
                touchedtype={touched.content}
              />
              <button
                className="text-black mt-2 ml-8 text-lg border-2 border-y-black border-x-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
                type="submit"
              >
                Create post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default CreatePost
