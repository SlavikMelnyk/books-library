import React, { useEffect } from "react";
import { Book, Author } from "../types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputGroup from "./shared/InputGroup";
import FormInput from "./shared/FormInput";
import MultiSelect from "./MultiSelect";
import { Link, useParams } from "react-router-dom";
import { getStorageData, setStorageData } from "../utils/storage";

interface BookFormProps {
  onSave: (updatedBook: Record<string, any>) => void;
}

interface bookFormTypes {
  title: string;
  publicationYear: number;
  selectedAuthors: string[];
}

const defaultValues: bookFormTypes = {
  title: "",
  publicationYear: new Date().getFullYear(),
  selectedAuthors: [] as string[], 
};

const bookFormSchema = yup.object().shape({
  title: yup.string().required("This field is required!").min(4),
  publicationYear: yup.number().required("This field is required!").integer().positive(),
  selectedAuthors: yup.array().required(),
});

const BookForm: React.FC<BookFormProps> = ({ onSave }) => {
  const methods = useForm<bookFormTypes>({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(bookFormSchema),
  });

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = methods;

  const [authors, setAuthors] = React.useState<Author[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const storedAuthors = getStorageData("authors") || [];
    setAuthors(storedAuthors);

    if (id) {
      const bookToEdit = getStorageData("books")?.find(
        (book: Book) => book?.id === id
      );
      if (bookToEdit) {
        setValue("title", bookToEdit?.title);
        setValue("publicationYear", bookToEdit?.publicationYear);
        const selectedAuthorNames = bookToEdit?.authors?.map(
          (author: { fullName: any; }) => author.fullName
        ) || [];
        setValue("selectedAuthors", selectedAuthorNames);
      }
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<bookFormTypes> = (data) => {
    const selectedAuthors = getValues("selectedAuthors");
    const updatedBook = {
      id: id ,
      title: data?.title,
      publicationYear: data?.publicationYear,
      authors: authors.filter((author) => selectedAuthors.includes(author.fullName)),
    };

    const books = getStorageData("books") || [];

    if (id) {
      const updatedBooks = books.map((book: Book) =>
        book.id === id ? updatedBook : book
      );
      setStorageData("books", updatedBooks);
    }
  

    onSave(updatedBook);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputGroup label="Title" error={errors.title?.message as string}>
              <FormInput register={register} name="title" />
            </InputGroup>
          </div>
          <div className="mb-4">
            <InputGroup label="Publication Year" error={errors.publicationYear?.message as string}>
              <FormInput register={register} name="publicationYear" />
            </InputGroup>
          </div>
          <div className="mb-4">
            <p>Select Authors:</p>
            {authors.length === 0 ? (
              <>
                <p>Please add authors in</p>
                <Link to="/authors" className="text-indigo-700">Authors List</Link>
              </>
            ) : (
              <MultiSelect items={authors} name="selectedAuthors" />
            )}
          </div>
          <button
            disabled={errors.selectedAuthors !== undefined}
            className={`${
              errors.selectedAuthors
                ? "bg-gray-500"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Save
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default BookForm;


