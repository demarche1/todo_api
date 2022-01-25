const sql = require("../db");

class Todo {
  constructor() {
    this.#createTable();
  }

  index(title, result) {
    let query = "SELECT * FROM todos";

    if (title) {
      query += ` WHERE title LIKE "%${title}%"`;
    }

    sql.query(query, (err, results, _fields) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Todos: ", results);

      result(null, results);
    });
  }

  create(newTodo, result) {
    sql.query("INSERT INTO todos SET ?", newTodo, (err, results, _fields) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Todo: ", { id: results.insertId, ...newTodo });

      result(null, { id: results.insertId, ...newTodo });
    });
  }

  update(todo, result) {
    sql.query(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [todo.completed, todo.id],
      (err, results, _fields) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        result(null, results);
      }
    );
  }

  delete(todoId, result) {
    sql.query(
      "DELETE FROM todos WHERE id = ?",
      todoId,
      (err, results, _fields) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        result(null, results);
      }
    );
  }

  #createTable() {
    sql.query(
      `create table if not exists todos(
                id int primary key auto_increment,
                title varchar(255) not null,
                completed tinyint(1) not null default 0
            )`,
      (err, _results, _fields) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
  }
}

module.exports = Todo;
