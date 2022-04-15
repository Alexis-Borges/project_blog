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
    <section className="">
      {apiError ? (
        <div className="">
          Error
          {apiError}
        </div>
      ) : null}
      <div className="px-10 py-6">
        <h2 className="">
          Modify account
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
            <Form>
              <Field
                label="Username"
                id="displayName"
                name="displayName"
                placeholder="Username"
                errorType={errors.displayName}
                touchedType={touched.displayName}
              />
              <Field
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="6 characters minimum"
                errorType={errors.password}
                touchedType={touched.password}
              />
              <Field
                label="Confirm password"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Same as password "
                errorType={errors.passwordConfirm}
                touchedType={touched.passwordConfirm}
              />
              <button
                className=""
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
