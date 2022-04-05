import express from "express"
import config from "./src/config.js"
import pino from "pino"
import knex from "knex"
import { Model } from "objection"
import roleRoutes from "./src/routes/role.js"
import commentRoutes from "./src/routes/comment.js"
import postRoutes from "./src/routes/post.js"
import userRoutes from "./src/routes/user.js"
import sessionRoutes from "./src/routes/session.js"
import cors from "cors"

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
})

const app = express()
const db = knex(config.db)
Model.knex(db)

app.use(express.json())
app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
)
roleRoutes({ app })
commentRoutes({ app })
postRoutes({ app })
userRoutes({ app })
sessionRoutes({ app })

app.listen(config.port, () => logger.info(`listening on port : ${config.port}`))

