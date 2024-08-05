import React from 'react';
import { Author } from '../types';
import { useForm, SubmitHandler } from "react-hook-form"

interface AuthorFormProps {
  author: Author;
  onAuthorChange: (updatedAuthor: Author) => void;
  onSave: () => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ author, onAuthorChange, onSave }) => {
  const {
    register,
    handleSubmit,
  } = useForm<Author>({defaultValues: author})
  const onSubmit: SubmitHandler<Author> = data =>{
    const updatedAuthor = { ...author, ...data };
    onAuthorChange(updatedAuthor);
    onSave()
    
  }
  
  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
        <input
        {...register("fullName", {required:true})}
          type="text"
          value={author.fullName}
          onChange={(e) => onAuthorChange({ ...author, fullName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type='submit'
        className="bg-buttonColor hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
      >
        Save
      </button>
      </form>
    </div>
  );
};

export default AuthorForm;
