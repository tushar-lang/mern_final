const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const carsRouter = require("express").Router();

const cors = require('cors');
const app = express();
const port = 7000;
app.use(cors())

app.use(bodyParser.json());
const uri = "mongodb+srv://tushar:tushar@tushar.y0ky74s.mongodb.net/test";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String
  });

const Book = mongoose.model("Book", booksSchema);

const db = mongoose.connection;

//getBook
app.get("/", async (req, res) => {
    try {
      const book = await Book.find();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).send("Failed to fetch books from collection");
    }
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//getBook by id
app.get("/:title", async (req, res) => {
  const searchtitle = req.params.tile;
  const regex = new RegExp(searchtitle, "i");
  try {
    const books = await Book.find({ "title": regex }).exec();
    res.json(books);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Addbook
app.post("/", async (req, res)=>{
    try{
        if(req.body.title && req.body.author && req.body.description){
            const addedBook = new Book({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description
            });
            await addedBook.save();
            res.status(200).json(addedBook);
        }else {
            res.status(400).json({ message: "Failed to add Book." });
        }
    }catch (error) {
        res.status(500).send("Failed to add cars with error");
    }
    }
)

//Delete book
app.delete("/:id", async (req, res) => {
  try {
    const deletebook = await Book.findByIdAndDelete(req.params.id);
    console.log("book: ", deletebook);
    console.log("id: ", req.params.id);
    if (!deletebook) {
      return res.status(404).send("Book not found.");
    }
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(500).send("Failed to delete Book with error");
  }
});

//Update A Book by id
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send("Book not found.");
    }
    res.status(200).json({ message: "Book updated successfully.", book });
  } catch (error) {
    res.status(500).send("Failed to update Book with error");
  }
});


