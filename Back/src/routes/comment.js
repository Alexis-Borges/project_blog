import CommentModel from "../db/models/Comment.js"
import auth from "../middlewares/auth.js"
import PostModel from "../db/models/Post.js"


const commentRoutes = ({ app }) => {
  app.get("/posts/:postId/comments", auth, async (req, res) => {
    const {
      params: { postId },
    } = req
    const post = await PostModel.query().findById(postId)

    if (!post) {
      res.status(404).send({ error: "Post Not Found" })

      return
    }

    const comments = await CommentModel.query().select("comments.*", "users.displayName as author").leftJoinRelated("users").where("post_id", postId).orderBy("createdAt", "desc")

    res.send(comments)
  })

  app.post("/:userId/posts/:postsId/comments", auth, async (req, res) => {
    const {
      params: { postsId, userId },
      body: { content }
    } = req

    await CommentModel.query().insert({
      content,
      user_id: userId,
      post_id: postsId
    })

      .select("comments.*", "users.displayName as author")
      .leftJoinRelated("users")

    res.send("commentaire ajouter")
  })

  app.put("/posts/:postId/comments", auth, async (req, res) => {
    const {
      params: { postId },
    } = req
    const post = await PostModel.query().findById(postId)

      .select("comments.*", "users.displayName as author")
      .leftJoinRelated("users")

    if (!post) {
      res.status(404).send({ error: "Post Not Found" })

      return
    }

    const comments = await CommentModel.query().where("post_id", postId)
    res.send(comments)
  })

  app.get("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
    } = req
    const comment = await CommentModel.query().findById(commentId)

      .select("comments.*", "users.displayName as author")
      .leftJoinRelated("users")

    if (!comment) {
      res.status(404).send({ error: "Comment Not Found" })

      return
    }

    res.send(comment)
  })

  app.put("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
      body: { content }
    } = req


    const comment = await CommentModel.query().updateAndFetchById(commentId, { content })

      .select("comments.*", "users.displayName as author")
      .leftJoinRelated("users")

    if (!comment) {
      res.status(404).send({ error: "Comment dont exist" })

      return
    }

    res.send("Comment Modified")
  })

  app.delete("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
    } = req

    const comment = await CommentModel.query().findById(commentId)

    if (!comment) {
      res.status(404).send({ error: "Comment dont exist" })

      return
    }

    await CommentModel.query().delete().where({ id: commentId })

    res.send("Comment Deleted Succesfully")
  })
}

export default commentRoutes
