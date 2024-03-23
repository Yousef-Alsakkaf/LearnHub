import React, { useState } from "react";
import BookModal from "../../../components/modal/ViewMonal";
import CourseDetails from "../../../templates/courses/CourseDetails";
import socket from "../../../socket";
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
  rack: string;
  editor: string;
  edition_num: number;
  quantity: number;
};
type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedBook: Book | null;
};
const ViewItem: React.FC<BookModalProps> = ({
  isVisible,
  onClose,
  selectedBook,
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleBorrow = (id: number) => {
      socket.emit("borrow-book", { id: id });
      socket.on("borrow-book-response", (response) => {
        console.log("This is the response from borrowing the book: ", response);
      })
    }
  return (
    <BookModal isVisible={isVisible} onClose={onClose}>
      {selectedBook && (
        <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Book Info
          </h3>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <p>{selectedBook.title}</p>
          </div>
          {/* author */}

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author
            </label>
            <p>{selectedBook.author}</p>
          </div>

          {/* barcode */}
          <div className="mb-4">
            <label
              htmlFor="barcode"
              className="block text-gray-700 font-bold mb-2"
            >
              Barcode
            </label>
            <p>{selectedBook.barcode}</p>
          </div>

          {/* language */}
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-gray-700 font-bold mb-2"
            >
              Language
            </label>
            <p>{selectedBook.language}</p>
          </div>

          {/* year_of_prod */}

          <div className="mb-4">
            <label
              htmlFor="year_of_prod"
              className="block text-gray-700 font-bold mb-2"
            >
              Year of production
            </label>
            <p>{selectedBook.year_of_prod}</p>
          </div>

          {/* publisher */}

          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="block text-gray-700 font-bold mb-2"
            >
              Publisher
            </label>
            <p>{selectedBook.publisher}</p>
          </div>

          {/* subjects */}

          <div className="mb-4">
            <label
              htmlFor="subjects"
              className="block text-gray-700 font-bold mb-2"
            >
              Subjects
            </label>
            <p>{selectedBook.subjects}</p>
          </div>

          {/* no_of_pages */}
          <div className="mb-4">
            <label
              htmlFor="no_of_pages"
              className="block text-gray-700 font-bold mb-2"
            >
              Number of pages
            </label>
            <p>{selectedBook.no_of_pages}</p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <p>{selectedBook.price}</p>
          </div>

          {/* rack */}
          <div className="mb-4">
            <label
              htmlFor="rack"
              className="block text-gray-700 font-bold mb-2"
            >
              Rack
            </label>
            <p>{selectedBook.rack}</p>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleBorrow(selectedBook.id)}
            >
              Borrow
            </button>
          </div>
        </div>
        
      )}

      {/* <CourseDetails onClose={() => setShowModal(false)} isVisible={showModal}></CourseDetails> */}
    </BookModal>
  );
};

export default ViewItem;
