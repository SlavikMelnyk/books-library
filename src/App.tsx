import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookListPage from './pages/BookList';
import AuthorListPage from './pages/AuthorList';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import AddAuthorPage from './pages/AddAuthorPage';
import EditAuthorPage from './pages/EditAuthorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<BookListPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
        <Route path="/authors" element={<AuthorListPage />} />
        <Route path="/add-author" element={<AddAuthorPage />} />
        <Route path="/edit-author/:id" element={<EditAuthorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
