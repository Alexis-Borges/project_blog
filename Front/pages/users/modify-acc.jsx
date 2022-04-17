import { useRouter } from "next/router"
import { useContext } from "react"
import Header from "../../src/components/Header"
import AppContext from "../../src/components/AppContext"
import ModifyAccForm from "../../src/components/ModifyAccForm"

const ModifyAccPage = () => {
  const { router, session } = useContext(AppContext)

  let sessionId = null
  if (session) {
    sessionId = JSON.parse(session).payload.user.userId
  }

  const {
    query: { userId },
  } = useRouter()

  if (userId != sessionId) {
    router.back()

    return null
  }

  return (
    <>
      <Header />
      <ModifyAccForm />
    </>
  )
}

export default ModifyAccPage
