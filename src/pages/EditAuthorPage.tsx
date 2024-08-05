import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Author } from "../types";
import AuthorForm from "../components/AuthorForm";
import Layout from "../Layout";
import { getStorageData, setStorageData } from "../utils/storage";

const EditAuthorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author>({
    id: "",
    fullName: "",
    numberOfBooks: 0,
  });

  useEffect(() => {
    if (id) {
      const storedAuthors = getStorageData("authors");
      const authorToEdit = storedAuthors.find((a: Author) => a.id === id);
      if (authorToEdit) setAuthor(authorToEdit);
    }
  }, [id]);

  const handleSave = () => {
    const storedAuthors = getStorageData("authors");
    if (id) {
      const updatedAuthors = storedAuthors.map((a: Author) =>
        a.id === id ? author : a
      );
      setStorageData("authors",updatedAuthors);
    }
    navigate("/authors");
  };

  return (
    <Layout>
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
        <AuthorForm
          author={author}
          onAuthorChange={setAuthor}
          onSave={handleSave}
        />
      </div>
    </Layout>
  );
};

export default EditAuthorPage;
