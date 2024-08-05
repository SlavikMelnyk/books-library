export interface Author {
    id: string;
    fullName: string;
    numberOfBooks: number;
  }
  
  export interface Book {
    id: string;
    title: string;
    authhorIds: string[];
    publicationYear: string;
    authors: Author[];
  }
  