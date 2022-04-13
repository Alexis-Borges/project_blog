import { useCallback, useContext } from "react"
import { Formik, Field, Form, ResetForm } from "formik"
import * as Yup from "yup"
import AppContext from "./AppContext"
import api from "./services/api"
import { useRouter } from "next/router"

const displayingErrorMess = Yup.object().shape({
  title: Yup.string()
    .max(100, "Max 100 characters  ✍️")
    .required("Enter a Title 🚨"),
  content: Yup.string()
    .max(1000, "Max 1000 Characters ✍️")
    .required("Enter The Content 🚨"),
})

const CreatePost = () => {
  const { router, session } = useContext(AppContext)

  const {
    query: { userId },
  } = useRouter()

  let id = null
  let userRoleId = null

  if (session) {
    id = JSON.parse(session).payload.user.userId
    userRoleId = JSON.parse(session).payload.user.roleId
  }

  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      await api.post(`/users/${id}/posts`, { title, content })
      router.reload()
    },
    [router, id]
  )

  return (
    <>
      {userId == id || userRoleId == 3 || userRoleId == 2 ? (
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
              validationSchema={displayingErrorMess}
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
                  />
                  {touched.title && errors.title && (
                    <div className="errorField mb-2 ml-5 rounded-xl">
                      {errors.title}
                    </div>
                  )}
                  <p> Content </p>
                  <Field
                    as="textarea"
                    className=" w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                    label="Content"
                    type="textarea"
                    id="content"
                    name="content"
                    placeholder="Content Of The Post"
                    rows="6"
                  />
                  {touched.content && errors.content && (
                    <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                      {errors.content}
                    </div>
                  )}
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
      ) : null}
    </>
  )
}

CreatePost.private = true

export default CreatePost
