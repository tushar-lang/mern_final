import React, { useState } from "react";

function AddBook(props) {
    const [book, setBook] = useState({
      title: "",
      author: "",
      description: "",
    });
  
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleChange = (e) => {
      setBook({ ...book, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(book);
      setIsSubmitted(true);
    };
  
    const addBook = () => {
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const description = document.getElementById("description").value;
  
      if (title && author && description) {
        console.log("HI--------->")
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            author: author,
            description: description,
          }),
        };
        fetch("https://backend-mern-final.onrender.com/", requestOptions).then((response) =>
          response.json()
          
        );
      }
    };
  
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <a className="btn btn-info float-left" href="/">
                Show Book List
              </a>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">Create new book</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    id="title"
                    type="text"
                    placeholder="Title of the Book"
                    name="title"
                    className="form-control"
                    value={book.title}
                    spellCheck="false"
                    data-ms-editor="true"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    id="author"
                    type="text"
                    placeholder="Author"
                    name="author"
                    className="form-control"
                    value={book.author}
                    spellCheck="false"
                    data-ms-editor="true"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="description"
                    placeholder="Describe this book"
                    name="description"
                    className="form-control"
                    value={book.description}
                    spellCheck="false"
                    data-ms-editor="true"
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Add Book"
                  onClick={addBook}
                />
              </form>
              {isSubmitted ? <div>The Book is sucessfully added. </div> : addBook}
            </div>
          </div>
        </div>
      </div>
    )
}
export default AddBook;