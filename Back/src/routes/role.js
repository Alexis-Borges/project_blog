import RoleModel from "../db/models/Role.js"
import auth from "../middlewares/auth.js"

const roleRoutes = ({ app }) => {
  app.get("/roles/", auth, async (req, res) => {
    const roles = await RoleModel.query()

    res.send(roles)
  })
}

export default roleRoutes
