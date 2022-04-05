
export const seed = async (knex) => {
  await knex("posts").del()
  await knex("posts").insert([
    { id: 1, title: "SSUUU", content: "DOPESD" },
    { id: 2, title: "SKU", content: "DOPesdfgESD" },
    { id: 3, title: "TRKL", content: "DOPEsdfsSD" },
    { id: 4, title: "TRKL killian", content: "DOPEdsdfsSD" },
    { id: 5, title: "TRKL barnabe", content: "DOPEssdfsSD" },

  ])
}
