import Header from "../src/components/Header"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import Link from "next/link"

const displayErrorMes = Yup.object({
  password: Yup.string()
    .required("Please enter your Password.🚨")
    .min(8, "Your password is too short.🚨"),
  retypePassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
  email: Yup.string()
    .email("Invalid email format🚨")
    .required("An Email is Required 🚨"),
})

const sign_in = () => {
  return (
    <div>
      <Header />
      <h1 className="w-3/4 mx-auto p-10 font-bold text-4xl"> Sign In </h1>
      <Formik
        initialValues={{ placeholder: "PassWord" }}
        validationSchema={displayErrorMes}
      >
        {({ errors, touched }) => (
          <Form className=" w-3/4 p-10 mx-auto rounded-xl ">
            <Field
              className="w-3/4 border-2 border-gray-300 p-2 m-4 rounded-xl"
              id="email"
              name="email"
              placeholder="Enter Your Email Address"
            ></Field>
            {touched.email && errors.email && (
              <div className="errorField w-1/8 mb-2 ml-5 text-red-500 rounded-xl">
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
              <div className="errorField w-1/8 mb-2 ml-5 text-red-500 rounded-xl">
                {errors.password}
              </div>
            )}
            <br />
            <Link href="/resetp">
            <a className="text-black mx-auto ml-5 "> Forgot Your Password ?</a>
            </Link>
            <br />
            <button
              className="w-1/4 p-2 text-white opacity-100 bg-green-400 hover:bg-green-500 mt-8 rounded-xl m-4 "
              type="submit"
            >
              Connexion 🤗
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default sign_in
