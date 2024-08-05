import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Author, Book } from '../types';
import Layout from '../Layout';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { getStorageData, setStorageData } from '../utils/storage';

const AuthorListPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedAuthors = getStorageData('authors') || [];
    const storedBooks = getStorageData('books') || [];
    setAuthors(storedAuthors);
    setBooks(storedBooks);
  }, []);

  const handleDelete = (id: string) => {
    const updatedAuthors = authors.filter(author => author.id !== id);
    setAuthors(updatedAuthors);
    setStorageData('authors', updatedAuthors);

    const updatedBooks = books.map(book => ({
      ...book,
      authors: book.authors.filter(author => author.id !== id),
    }));
    setBooks(updatedBooks);
    setStorageData('books', updatedBooks);
  };

  const sortedAuthors = authors.sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <Layout>
      <div>
        <h1 className='text-slate-800 font-bold text-2xl'>Author List</h1>
        <div className="flex min-h-[100px] max-h-[500px] border-2 border-gray-500 p-4 rounded-xl bg-bgList overflow-scroll mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-center border-b-2">
                <th></th>
                <th className='text-iconColor'>ID</th>
                <th className='text-iconColor'>Full Name</th>
                <th className='text-iconColor'>Number of Books</th>
                <th className='text-iconColor'>Edit</th>
                <th className='text-iconColor'>Delete</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {sortedAuthors.map(author => {
                const bookCount = books.filter(book =>
                  book.authors.some(a => a.id === author.id)
                ).length;

                return (
                  <tr className='bg-white border-b-8 border-bgList' key={author.id}>
                    <td className="p-4"><IoPerson className='text-iconColor text-2xl'/></td>
                    <td className="p-2 text-gray-700">{author.id}</td>
                    <td className="p-2 text-gray-700">{author.fullName}</td>
                    <td className="p-2 text-gray-700">{bookCount}</td>
                    <td className="p-2 text-gray-700">
                      <Link to={`/edit-author/${author.id}`}>
                        <p className="p-2 rounded">
                          <FaEdit className="text-iconColor bg-gray-300 p-1 rounded-md text-3xl" />
                        </p>
                      </Link>
                    </td>
                    <td className="p-2">
                      <button onClick={() => handleDelete(author.id)}>
                        <p className='pt-[8px]'>
                          <MdDeleteForever className="text-iconColor bg-gray-300 p-1 rounded-md text-3xl" />
                        </p>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/add-author">
          <button className='bg-buttonColor hover:bg-indigo-600 p-2 text-white rounded-xl mt-2'>Add Author</button>
        </Link>
      </div>
    </Layout>
  );
};

export default AuthorListPage;
