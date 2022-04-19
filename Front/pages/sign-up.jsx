import Header from "../src/components/Header"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { useCallback, useContext } from "react"
import AppContext from "../src/components/AppContext"

const displayErrorMes = Yup.object({
  displayName: Yup.string()
    .max(21, "Your Nickname Is too Long 🚨")
    .required("Please enter a Nickname 🚨"),
  email: Yup.string()
    .email("Invalid email format🚨")
    .required("An Email is Required 🚨"),
  password: Yup.string()
    .required("Please enter your Password.🚨")
    .min(8, "Your password is too short.🚨"),
})

const Sign_up = () => {
  const { signUp } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ displayName, email, password }) => {
      return signUp(displayName, email, password)
    },
    [signUp]
  )

  return (
    <div>
      <Header />
      <h1 className="w-3/4 mx-auto pl-14 pt-11 mt-10 font-bold text-4xl">
        Sign Up
      </h1>
      <Formik
        initialValues={{}}
        onSubmit={handleFormSubmit}
        validationSchema={displayErrorMes}
      >
        {({ errors, touched }) => (
          <Form className=" w-3/4 p-10 mx-auto rounded-xl">
            <Field
              type="text"
              className="w-3/4 border-2 bg-black text-white border-gray-300 p-2 m-4 rounded-xl"
              name="displayName"
              placeholder="Enter Your Nickmame"
            ></Field>
            <br />
            {touched.displayName && errors.displayName && (
              <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                {errors.displayName}
              </div>
            )}
            <Field
              name="email"
              className="w-3/4 border-2 bg-black text-white border-gray-300 p-2 m-4 rounded-xl"
              placeholder="Enter Your Email Address"
            ></Field>
            <br />
            {touched.email && errors.email && (
              <div className="errorField w-1/8 mb-2 ml-5  rounded-xl">
                {errors.email}
              </div>
            )}
            <Field
              type="password"
              name="password"
              className=" w-3/4 border-2 bg-black text-white border-gray-300 mt-4 m-4 p-2 rounded-xl "
              placeholder="Enter Your Password"
            ></Field>

            {touched.password && errors.password && (
              <div className="errorField w-1/8 mb-2 ml-5 rounded-xl">
                {errors.password}
              </div>
            )}
            <br />
            <button
              type="submit"
              className="w-1/4 p-2 text-white border-2 hover:bg-green-500 mt-8 rounded-xl m-4 "
            >
              Insciption 🤑
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Sign_up
