const { Router } = require("express");
const TodoController = require("../controllers/Todo.controller");

const router = Router();

router.get("/", TodoController.index);
router.get("/:id", TodoController.show);
router.post("/", TodoController.store);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.destroy);

module.exports = router;
