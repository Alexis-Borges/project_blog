import UserModel from "../db/models/User.js"
import auth from "../middlewares/auth.js"

const userRoutes = ({ app }) => {
  app.get("/users", auth, async (req, res) => {
    const users = await UserModel.query()

    res.send(users)
  })

  app.get("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
    } = req
    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "User Not Found" })

      return
    }

    res.send(user)
  })


  app.put("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
      body: { displayName }
    } = req

    const user = await UserModel.query().updateAndFetchById(userId, { displayName })

    if (!user) {
      res.status(404).send({ error: "User not found" })

      return
    }

    res.send("Pseudo Updated")
  })

  app.delete("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
    } = req

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "User dont exist" })

      return
    }

    await UserModel.query().delete().where({ id: userId })

    res.send("User Deleted Succesfully")
  })
}

export default userRoutes
