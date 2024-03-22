import React, { useState } from 'react'
import Library from '../../../templates/library/Library'
import { ViewAllItems } from '../../../temp/ViewAllItems';
type Book = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: number;
  author: string;
  barcode: number;
  language: string;
  year_of_prod: number;
  publisher: string;
  subjects: string;
  price: number;
  type: string;
  no_of_pages: number;
  isbn: string;
  rack: number;
  editor: string;
  edition_num: number;
  quantity: number;
};
function ViewItems() {
  const [books, setBooks] = useState<Book[]>(ViewAllItems);
  return (
    <Library name="ViewItems">
        <div className="libraryBox grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              className="libraryCards bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out transform hover:scale-105"
              key={book.id}
            >
              <div className="libraryImage relative">
                <img src={book.image} className="Image" alt={book.title} />
              </div>
              <div className="libraryTag flex flex-col justify-center items-center mt-2">
                <p className="text-xl font-semibold text-center">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <div className="libraryIcons mt-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a
                  href="#"
                  className="borrowBtn mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                 
                >
                  View
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
        </div>
    </Library>
  )
}

export default ViewItems
