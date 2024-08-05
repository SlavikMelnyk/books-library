import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Author } from '../types';
import Layout from '../Layout';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getStorageData, setStorageData } from '../utils/storage';
import { MdMenuBook } from "react-icons/md";

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');

  useEffect(() => {
    const storedBooks = getStorageData('books') || [];
    const storedAuthors = getStorageData('authors') || [];
    const storedSelectedAuthor = localStorage.getItem('selectedAuthor') || '';

    setBooks(storedBooks);
    setAuthors(storedAuthors);
    setSelectedAuthor(storedSelectedAuthor);
  }, []);

  const handleApplyFilter = () => {
    localStorage.setItem('selectedAuthor', selectedAuthor);
  };

  const handleDelete = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setStorageData('books', updatedBooks);
  };

  const filteredBooks = selectedAuthor
    ? books.filter(book => book.authors.some(author => author.id === selectedAuthor))
    : books;

  const sortedBooks = filteredBooks.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Layout>
      <div>
        <h1 className='text-slate-800 text-2xl font-bold'>Book List</h1>
        <div>
          <select
            className=' bg-selectColor focus:outline-none  px-1 py-2  rounded text-slate-800'
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.fullName}</option>
            ))}
          </select>
          <button 
            onClick={handleApplyFilter}
            className="ml-2 bg-buttonColor hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply
          </button>
        </div>
        <div className="flex min-h-[100px] max-h-[500px] border-2 border-gray-500 p-4 rounded-xl bg-bgList overflow-scroll mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-center border-b-2">
                <th></th>
                <th className='text-iconColor'>ID</th>
                <th className='text-iconColor' >Title</th>
                <th className='text-iconColor'>Author(s)</th>
                <th className='text-iconColor'>Publication Year</th>
                <th className='text-iconColor'>Edit</th>
                <th className='text-iconColor'>Delete</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {sortedBooks.map(book => (
                <tr className='bg-white border-b-8 border-bgList' key={book.id}>
                  <td className="p-4"><MdMenuBook className='text-iconColor text-2xl'/></td>
                  <td className="p-2 text-gray-700">{book.id}</td>
                  <td className="p-2 text-gray-700">{book.title}</td>
                  <td className="p-2 text-gray-700">{book.authors.map(author => author.fullName).join(', ')}</td>
                  <td className="p-2 text-gray-700">{book.publicationYear}</td>
                  <td className="p-2 text-gray-700"><Link to={`/edit-book/${book.id}`}><p className=""><FaEdit className="text-iconColor p-1 rounded-md bg-gray-300 text-3xl" /></p></Link></td>
                  <td className="p-2"><button onClick={() => handleDelete(book.id)}><p className='pt-[8px]'> <MdDeleteForever className="text-iconColor p-1 rounded-md bg-gray-300 text-3xl" /></p></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/add-book"><button className="bg-buttonColor hover:bg-indigo-600 p-2 text-white rounded-xl mt-2">Add Book</button></Link>
      </div>
    </Layout>
  );
};

export default BookListPage;
