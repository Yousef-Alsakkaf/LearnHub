import { books } from "../../../temp/RequestedBooks";
import Library from "../../../templates/library/Library";
import React from "react";

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
  description: string;
};

function ViewRequestedItems() {
  return (
    <Library>
      <div className="m-5">
        {books.map((book) => (
          <div
            key={book.id}
            className="group mx-2 mt-10 grid max-w-screen-lg grid-cols-1 space-x-8 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-lg sm:mx-auto sm:grid-cols-5"
          >
            <a
              href="#"
              className="col-span-2 text-left text-gray-600 hover:text-gray-700"
            >
              <div className="group relative h-64 w-full overflow-hidden">
                <img
                  src={book.image}
                  alt=""
                  className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125"
                />
                <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">
                  {book.title}
                </span>
                <img
                  src="/images/AnbWyIjnwNbW9Wz6c_cja.svg"
                  className="absolute inset-1/2 w-10 max-w-full -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-125"
                  alt=""
                />
              </div>
            </a>
            <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
              <a
                href="#"
                className="mt-3 overflow-hidden text-2xl font-semibold"
              >
                {book.title}
              </a>
              <p className="overflow-hidden text-sm">{book.description}</p>
              <a
                href="#"
                className="text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                {book.author}
              </a>
              <div className="flex flex-col text-gray-700 sm:flex-row">
                <div className="flex h-fit space-x-2 text-sm font-medium">
                  <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                    {book.no_of_pages} Pages
                  </div>
                  <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                    {book.quantity} Available
                  </div>
                </div>
                <a
                  href="#"
                  className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto"
                >
                  Accept
                </a>
                <a
                  href="#"
                  className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto"
                >
                  Reject
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Library>
  );
}

export default ViewRequestedItems;
