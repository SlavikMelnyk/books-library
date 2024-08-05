import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Author } from '../types';
import AuthorForm from '../components/AuthorForm';
import Layout from '../Layout';
import { v4 as uuidv4 } from 'uuid';
import { getStorageData, setStorageData } from '../utils/storage';
const AddAuthorPage: React.FC = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author>({ id: '', fullName: '', numberOfBooks: 0 });

  const handleSave = () => {
    const storedAuthors = getStorageData('authors') 
    const newAuthor = { ...author, id: uuidv4()};
    setStorageData('authors',[...storedAuthors, newAuthor]);
    navigate('/authors');
  };

  return (
        <Layout>
    <div >
      <h1 className="text-2xl font-bold mb-4">Add Author</h1>
      <AuthorForm
        author={author}
        onAuthorChange={setAuthor}
        onSave={handleSave}
      />
    </div>
      </Layout>
  );
};

export default AddAuthorPage;
