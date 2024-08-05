import React, { useState, useRef } from "react";
import { Author } from "../types";
import { useFormContext } from "react-hook-form";

interface AuthorSelectProps {
  items: Author[];
  name: string;
}

const AuthorSelect: React.FC<AuthorSelectProps> = ({ items, name }) => {
  const { setValue, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const selectedAuthors = watch(name);

  const handleToggleOption = (author: Author) => {
    const currentSelected = selectedAuthors || [];
    const updatedOptions = currentSelected.includes(author.fullName)
      ? currentSelected.filter((item: string) => item !== author.fullName)
      : [...currentSelected, author.fullName];

    setValue(name, updatedOptions);
  };

  const isSelected = (option: string) => selectedAuthors.includes(option);

  return (
    <div className="relative w-full max-w-[320px]" onClick={() => setIsOpen(true)}>
      <div className="border rounded-md p-2 cursor-pointer truncate">
        {selectedAuthors.length > 0
          ? selectedAuthors.join(", ")
          : "Select authors"}
      </div>
      {isOpen && (
        <div
          className="absolute mt-2 w-full focus:outline-none rounded-md shadow-lg bg-white"
          onBlur={() => setIsOpen(false)}
          ref={dropDownRef}
          tabIndex={1}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                isSelected(item.fullName) ? "bg-gray-200" : ""
              }`}
              onClick={() => handleToggleOption(item)}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={isSelected(item.fullName)}
                readOnly
              />
              {item.fullName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorSelect;
