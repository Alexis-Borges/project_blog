export const up = async (knex) => {
  await knex.schema.createTable("roles", (table) => {
    table.increments().unique()
    table.string("name").unique().notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })

  await knex.schema.createTable("users", (table) => {
    table.increments().unique()
    table.string("displayName").unique().notNullable()
    table.string("email").unique().notNullable()
    table.string("passwordSalt", 600).notNullable()
    table.string("passwordHash", 600).notNullable()
    table.integer("role_id").notNullable()
    table.foreign("role_id").references("id").inTable("roles").onDelete("RESTRICT")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments().unique()
    table.string("title").notNullable()
    table.string("content", 1000).notNullable()
    table.date("publicationDate").notNullable().defaultTo(knex.fn.now())
    table.integer("user_id")
    table.foreign("user_id").references("id").inTable("users").onDelete("SET NULL")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })

  await knex.schema.createTable("comments", (table) => {
    table.increments().unique()
    table.string("content", 1000).notNullable()
    table.date("publicationDate").notNullable().defaultTo(knex.fn.now())
    table.integer("post_id").notNullable()
    table.foreign("post_id").references("id").inTable("posts").onDelete("CASCADE")
    table.integer("user_id")
    table.foreign("user_id").references("id").inTable("users").onDelete("SET NULL")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("comments")
  await knex.schema.dropTable("posts")
  await knex.schema.dropTable("users")
  await knex.schema.dropTable("roles")
}