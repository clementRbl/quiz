const { Tag } = require("../models");

module.exports = {
  showList: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.render("tags", { tags });
    } catch (e) {
      console.trace(e);
      res.sendStatus(500);
    }
  },
  showDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const tag = await Tag.findByPk(id, {
        include: {
          association: "quizzes",
          include: "author",
        },
      });
      res.render("tag", { tag });
    } catch (e) {
      console.trace(e);
      res.sendStatus(500);
    }
  },
};