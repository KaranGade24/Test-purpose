const model = require("../model/book");
const Book = model.book;

exports.create = (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (err) {
    res.json(err);
  }
};

exports.read5 = async (req, res) => {
  // const id = req.params.id;

  try {
    const books = await Book.find().limit(5);
    console.log(books);
    res.send(books);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.read = async (req, res) => {
  const id = req.params.id;

  try {
    const books = await Book.find();
    console.log(books);
    res.json(books);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Book.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log(doc);
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Book.findOneAndDelete({ _id: id });
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// Controller method to delete all books
exports.deleteAll = async (req, res) => {
  const books = await Book.find();

  books.map(async (book) => {
    const id = book._id;
    const doc = await Book.findByIdAndDelete(id);
    console.log(doc);
    res.send(doc);
  });
};
