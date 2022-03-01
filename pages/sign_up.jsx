import Header from "../src/components/Header"
import { Formik, Field, Form, ResetForm } from "formik"
import * as Yup from "yup"

const displayErrorMes = Yup.object({
  password: Yup.string()
    .required("Please enter your Password.🚨")
    .min(8, "Your password is too short.🚨"),
  retypePassword: Yup.string()
    .required("Please Retype your password.🚨")
    .oneOf([Yup.ref("password")], "Your Passwords do not match.😵"),
  email: Yup.string()
    .email("Invalid email format🚨")
    .required("An Email is Required 🚨"),
  pseudo: Yup.string()
    .max(21, "Your Nickname Is too Long 🚨")
    .required("Please enter a Nickname 🚨"),
})

const sign_up = () => {
  return (
    <div>
      <Header />
      <h1 className="w-3/4 mx-auto p-10 font-bold text-4xl"> Sign Up </h1>
      <Formik
        initialValues={{ placeholder: "PassWord" }}
        validationSchema={displayErrorMes}
      >
        {({ errors, touched }) => (
          <Form className=" w-3/4 p-10 mx-auto rounded-xl">
            <Field
              type="text"
              className="w-3/4 border-2 border-gray-300 p-2 m-4 rounded-xl"
              id="pseudo"
              name="pseudo"
              placeholder="Enter Your Nickmame"
            ></Field>
            {touched.pseudo && errors.pseudo && (
              <div className="errorField w-1/8 mb-2 p-4 text-red-500 rounded-xl">
                {errors.pseudo}
              </div>
            )}
            <Field
              className="w-3/4 border-2 border-gray-300 p-2 m-4 rounded-xl"
              id="email"
              name="email"
              placeholder="Enter Your Email Address"
            ></Field>
            {touched.email && errors.email && (
              <div className="errorField w-1/8 mb-2 p-4 text-red-500 rounded-xl">
                {errors.email}
              </div>
            )}
            <Field
              type="password"
              className=" w-3/4 border-2 border-gray-300 mt-4 m-4 p-2 rounded-xl "
              name="password"
              id="password"
              placeholder="Enter Your Password"
            ></Field>
            {touched.password && errors.password && (
              <div className="errorField w-1/8 mb-2 p-4 text-red-500 rounded-xl">
                {errors.password}
              </div>
            )}
            <Field
              type="password"
              className=" w-3/4 border-2 border-gray-300 mt-4 m-4 p-2 rounded-xl "
              name="retypePassword"
              id="retypePassword"
              placeholder="Confirm Your Password"
            ></Field>
            {touched.retypePassword && errors.retypePassword && (
              <div className="errorField w-1/8 mb-2 p-4 text-red-500 rounded-xl">
                {errors.retypePassword}
              </div>
            )}
            <br />
            <button
              className="w-1/4 p-2 text-white bg-green-400 hover:bg-green-500 mt-8 rounded-xl m-4 "
              type="submit"
            >
              Insciption 🤑
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default sign_up
