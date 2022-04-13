import UserModel from "../db/models/User.js"
import config from "../config.js"
import jsonwebtoken from "jsonwebtoken"

const sessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { displayName, email, password }
    } = req

    const existingEmail = await UserModel.query().findOne({ email })

    if (existingEmail) {
      res.status(409).send({ error: "Email Already Exist" })

      return
    }

    const existingDisplayName = await UserModel.query().findOne({ displayName })

    if (existingDisplayName) {
      res.status(409).send({ error: "Name Already Taken" })

      return
    }

    const [hash, salt] = UserModel.hashPassword(password)

    await UserModel.query().insert({
      displayName,
      email,
      passwordSalt: salt,
      passwordHash: hash,
      role_id: 1,
    })

    res.send("account created succesfully")
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password }
    } = req

    const user = await UserModel.query().findOne({ email })

    if (!user || !user.checkPassword(password)) {
      res.status(401).send({ error: "invalid email or password" })

      return
    }



    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            userId: user.id,
            displayName: user.displayName,
            email: user.email,
            roleId: user.role_id,
          },
        },
      },
      config.security.password.secret
    )
    res.send({ jwt })
  })
}

export default sessionRoutes
