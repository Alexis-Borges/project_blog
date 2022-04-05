
export const seed = async (knex) => {
  await knex("roles").del()
  await knex("roles").insert([
    { id: 1, name: "reader" },
    { id: 2, name: "author" },
    { id: 3, name: "admin" }
  ])
}
