const res = require("express/lib/response");
const Todo = require("../models/Todo.model");

class TodoController {
  index(req, resp) {
    const { title } = req.body;

    const todo = new Todo();

    if (!req.body) {
      todo.index(null, (err, data) => {
        if (err) {
          resp.status(500).send({
            message:
              err.message || "Some error occurred while retrieves Todos.",
          });
        }

        resp.send(data);
      });
    }

    todo.index(title, (err, data) => {
      if (err) {
        resp.status(500).send({
          message: err.message || "Some error occurred while retrieves Todos.",
        });
      }

      resp.send(data);
    });
  }

  show(req, resp) {
    const todo = new Todo();

    todo.findById(req.body.id, (err, data) => {
      console.log("error:", err);
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `Not found todo with id: ${req.params.id}`,
          });
        } else {
          resp.status(500).send({
            message:
              err.message || "Some error occurred while deleting the Todo.",
          });
        }
      }

      resp.status(200).send({
        todo: data,
      });
    });
  }

  store(req, resp) {
    const { title, completed } = req.body;

    if (!title) {
      resp.status(400).send({
        message: "Title can not be empty!",
      });
    }

    const todo = new Todo();

    todo.create({ title, completed }, (err, data) => {
      if (err) {
        resp.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      }

      resp.send(data);
    });
  }

  update(req, resp) {
    const todo = new Todo();

    const todoReq = req.body;

    console.log("body", todoReq);

    todo.update(todoReq, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `Not found todo with id: ${req.params.id}`,
          });
        } else {
          resp.status(500).send({
            message:
              err.message || "Some error occurred while deleting the Todo.",
          });
        }
      }

      resp.status(200).send({
        message: "Todos was deleted successfully",
        todo: data,
      });
    });
  }

  destroy(req, resp) {
    const todo = new Todo();

    todo.delete(req.params.id, (err, data) => {
      console.log("error:", err);
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `Not found todo with id: ${req.params.id}`,
          });
        } else {
          resp.status(500).send({
            message:
              err.message || "Some error occurred while deleting the Todo.",
          });
        }
      }

      resp.status(200).send({
        message: "Todos was deleted successfully",
      });
    });
  }
}

module.exports = new TodoController();
