const db = require("../models");
const Book = db.books;

// create a book
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title can not be empty",
    });
  }

  // create a book
  const book = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // save book in the database
  Book.create(book)
    .then((data) => {
      res.json({
        message: "Book created successfully.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Book.",
        data: null,
      });
    });
};

// retrieve all books
exports.findAll = (req, res) => {
  Book.findAll()
    .then((books) => {
      res.json({
        message: "Books retrieved successfully.",
        data: books,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving books.",
        data: null,
      });
    });
};

// update
exports.update = (req, res) => {
  const id = req.params.id;
  Book.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Book updated successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot update book with id=${id}. Maybe book was not found or req.body is empty!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while updating the book.",
        data: null,
      });
    });
};

// delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Book.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Book deleted successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot delete book with id=${id}. Maybe book was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting the book.",
        data: null,
      });
    });
};

// find by id
exports.findOne = (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      res.json({
        message: "Book retrieved successfully.",
        data: book,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving book.",
        data: null,
      });
    });
};
