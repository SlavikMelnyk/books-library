import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";
import BookForm from "../components/BookForm";
import Layout from "../Layout";
import { v4 as uuidv4 } from "uuid";
import { getStorageData, setStorageData } from "../utils/storage";

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSave = (data: Record<string, string>) => {
    const updatedBook  = {
        ...data,
        id: uuidv4(),
    }
    const storedBooks = getStorageData("books");
    const updatedBooks = storedBooks.map((b: Book) =>
      b.id === id ? updatedBook : b
    );
    setStorageData("books", (updatedBooks));
    navigate("/");
  };

  return (
    <Layout>
     <div className="flex flex-col gap-4">
     <h1 className="text-2xl text-slate-800 ">Edit Book</h1>
      <BookForm onSave={handleSave} />
     </div>
    </Layout>
  );
};

export default EditBookPage;
