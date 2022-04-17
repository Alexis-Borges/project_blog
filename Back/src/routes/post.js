import PostModel from "../db/models/Post.js"
import UserModel from "../db/models/User.js"
import auth from "../middlewares/auth.js"

const postRoutes = ({ app }) => {
  app.get("/posts", async (req, res) => {
    const posts = await PostModel.query()
      
      .select("posts.*", "users.displayName as author")
      .leftJoinRelated("users")
      .orderBy("createdAt", "desc")

    res.send(posts)
  })

  app.get("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
    } = req
    const post = await PostModel.query().findById(postId)

      .select("posts.*", "users.displayName as author")
      .leftJoinRelated("users")

    if (!post) {
      res.status(404).send({ error: "Post Not Found" })

      return
    }

    res.send(post)
  })

  app.post("/users/:userId/posts", auth, async (req, res) => {
    const {
      params: { userId },
      body: { title, content }
    } = req

    const user = await UserModel.query().findById(userId)

      .orderBy("createdAt", "desc")

    if (!user) {
      res.status(404).send({ error: "User dont exist" })

      return
    }

    await PostModel.query().insert({
      title,
      content,
      user_id: userId,
    })

    res.send("post created")
  })

  app.get("/users/:userId/posts", auth, async (req, res) => {
    const {
      params: { userId }
    } = req

    const user = await UserModel.query().findById(userId)
  
      

    if (!user) {
      res.status(404).send({ error: "User dont exist" })

      return
    }

    const posts = await PostModel.query().where({ user_id: userId })

    res.send(posts)
  })

  app.put("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
      body: { title, content }
    } = req

    const post = await PostModel.query().updateAndFetchById(postId, { title, content })

    if (!post) {
      res.status(404).send({ error: "Post dont exist" })

      return
    }

    res.send("Post Modified")
  })

  app.delete("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
    } = req

    const post = await PostModel.query().findById(postId)

    if (!post) {
      res.status(404).send({ error: "Post dont exist" })

      return
    }

    await PostModel.query().delete().where({ id: postId })

    res.send("Post Deleted Succesfully")
  })
}

export default postRoutes
