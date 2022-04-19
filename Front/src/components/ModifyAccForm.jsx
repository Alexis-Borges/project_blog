import { useContext, useEffect, useState, useCallback } from "react"
import { Form, Field, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "./AppContext.jsx"
import api from "./services/api.js"

const displayErrorMes = Yup.object().shape({
  displayName: Yup.string()
    .max(40, "Must be at most 40 characters")
    .required("Required field"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
})

const ModifyAccForm = ({ userId }) => {
  const { router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ displayName, email, password }) => {
      try {
        await api.put(`/users/${userId}`, {
          displayName,
          email,
          password,
        })
        setApiError(null)
        router.push(`/users/${userId}`)
      } catch (err) {
        setApiError(err.response.data.error)
      }
    },
    [router, userId]
  )

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api.get(`/users/${userId}`).then((response) => setUser(response.data))
    }
  }, [userId])

  if (!user) {
    return <section>loading</section>
  }

  return (
    <section className="w-full mx-auto">
      {apiError ? (
        <div className="">
          Error
          {apiError}
        </div>
      ) : null}
      <div className="flex items-center justify-center py-5 text-3xl font-bold flex-col px-10 mx-auto p-5 rounded-xl w-3/4">
        <h2 className="flex items-center justify-center text-3xl mb-4 font-bold">
          ✍️ Modify account
        </h2>
        <Formik
          initialValues={{
            displayName: user.displayName,
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={displayErrorMes}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form className="w-full p-6 border-4 border-x-black border-y-transparent">
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                label="Username"
                id="displayName"
                name="displayName"
                placeholder="Username"
              />
              {touched.displayName && errors.displayName && (
                <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                  {touched.displayName && errors.displayName}
                </div>
              )}
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="6 characters minimum"
              />
              {touched.password && errors.password && (
                <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                  {touched.password && errors.password}
                </div>
              )}
              <Field
                className="w-full border-2 bg-black text-white border-gray-300 p-2 mb-4 mt-4 rounded-xl"
                label="Confirm password"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Same as password "
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                  {touched.passwordConfirm && errors.passwordConfirm}
                </div>
              )}
              <button
                className="text-black mt-2 ml-8 text-lg border-2 border-y-black border-x-transparent font-bold px-4 py-2 hover: transition-all hover:scale-125"
                type="submit"
              >
                Modify account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ModifyAccForm
