import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBook from './components/AddBook';

function App() {
  return (
    <div className="App">

    <Router>
    <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/create-book" element={<AddBook />} />
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;
