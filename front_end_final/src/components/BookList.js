import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import BookCard from "./BookCard";
import "../App.css"

import addbook from "./AddBook";

function BookList() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
      axios
        .get('https://backend-mern-final.onrender.com/')
        .then((res) => {
            console.log(res.data)
          setBooks(res.data);
        })
        .catch((err) => {
          console.log('Error from BookList');
        });
    }, []);
    const removeBook = (bookId) => {
        axios.delete(`https://backend-mern-final.onrender.com/${bookId}`)
          .then((res) => {
            const newBooks = books.filter(b => b._id !== bookId);
            setBooks(newBooks);
          })
          .catch((err) => {
            console.log(err);
          });
      }      
    const bookCount = books.length;
    const bookList =
      books.length === 0
        ? 'there is no book record!'
        : books.map((book, k) => <BookCard book={book} key={k} removeBook = {removeBook}/>);
    return (
      
      <div className='BookList'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <h2 className='display-4 text-center'>Books in the List : {bookCount}</h2>
            </div>
            <div className='col-md-11 '>
              <Link
                to='/create-book'
                className='btn btn-info btn-outline-warning float-right'
                onClick={addbook}
              >
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>
          <div className='list'>{bookList}</div>
        </div>
      </div>
     






    );
  }

  export default BookList;