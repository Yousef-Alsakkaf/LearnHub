import React, { useEffect, useState } from "react";
import Library from "../../../templates/library/Library";
import { ViewAllItems } from "../../../temp/ViewAllItems";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import socket from "../../../socket";
import ViewItem from "./ViewItem";

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
  const [books, setBooks] = useState<Book[]>([]);

 const [showModal, setShowModal] = useState(false);
 const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    socket.emit("get-books");
    console.log("sending")

    socket.on("get-books-response", (data: Book[]) => {
      setBooks(data);
    });

    return () => {
      socket.off("get-books-response");
    };
  }, []);

  const deleteBook = (barcode: number) => {
    setBooks(books.filter((book) => book.barcode !== barcode));

    socket.emit("delete-book", { barcode });
    socket.on("delete-book-response", (response) => {
      console.log(response);
    
    })
  };

  return (
    <Library name="ViewItems">
      <div className="libraryBox grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="libraryCards bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out transform hover:scale-105" key={book.id}>
              <div className="libraryImage relative">
                <img src={book.image} className="Image" alt={book.title} />
              </div>
              <div className="libraryTag flex flex-col justify-center items-center mt-2">
                <p className="text-xl font-semibold text-center">{book.title}</p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <div className="libraryIcons mt-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <div className="actionButtons mt-2">
                  <a href="#" className="borrowBtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    setShowModal(true)
                    setSelectedBook(book)
                  }}
                  >
                    View
                  </a>
                  <EditIcon style={{ color: "blue", marginLeft: "10px", cursor: "pointer" }} />
                  <DeleteIcon
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this book?")) {
                        deleteBook(book.barcode);
                      }
                    }}
                    style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      < ViewItem isVisible={showModal} selectedBook={selectedBook} onClose={() => setShowModal(false)} />
    </Library>
  );
}

export default ViewItems;
