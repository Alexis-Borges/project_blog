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

    const comments = await CommentModel.query().where("post_id", postId)
    res.send(comments)
  })

  app.get("/comments/:commentId", auth, async (req, res) => {
    const {
      params: { commentId },
    } = req
    const comment = await CommentModel.query().findById(commentId)

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