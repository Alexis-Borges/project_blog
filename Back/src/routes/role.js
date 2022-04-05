import RoleModel from "../db/models/Role.js"
import auth from "../middlewares/auth.js"

const roleRoutes = ({ app }) => {
  app.get("/roles/", auth, async (req, res) => {
    const roles = await RoleModel.query()

    res.send(roles)
  })

  app.get("/roles/:roleId", auth, async (req, res) => {
    const {
      params: { roleId },
    } = req

    const role = await RoleModel.query().findById(roleId)
    res.send(role)
  })
}


export default roleRoutes
