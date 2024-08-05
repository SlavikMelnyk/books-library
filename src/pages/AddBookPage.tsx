import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { v4 as uuidv4 } from "uuid";
import Layout from "../Layout";
import { getStorageData, setStorageData } from "../utils/storage";

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (data: Record<string, any>) => {
    const updatedBook = {
      ...data,
      id: uuidv4(),
    };
    const storedBooks = getStorageData("books");

    setStorageData(
      "books",
      storedBooks ? [...storedBooks, updatedBook] : [updatedBook]
    );

    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl text-slate-800">Add Book</h1>
        <BookForm onSave={handleSave} />
      </div>
    </Layout>
  );
};

export default AddBookPage;
