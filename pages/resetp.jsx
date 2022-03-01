import Header from "../src/components/Header"
import { Formik, Button, Form, FormInput } from "formik"

const onSubmit = async (
  values,
  { setSubmitting, setErrors, setStatus, resetForm }
) => {
  try {
    await auth.passwordUpdate(values.oldPassword, values.passwordOne)
    resetForm({})
    setStatus({ success: true })
  } catch (error) {
    setStatus({ success: false })
    setSubmitting(false)
    setErrors({ submit: error.message })
  }
}

const resetp = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default resetp