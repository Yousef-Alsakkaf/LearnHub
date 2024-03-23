import BookModal from "../../../../components/modal/ViewMonal";
import React from "react";

type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
const EditAssignment: React.FC<BookModalProps> = ({ isVisible, onClose }) => {
  return (
    <BookModal onClose={onClose} isVisible={isVisible}>
      <section className="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl text-gray-600 shadow-lg sm:my-10 sm:border">
        <div className="container mx-auto flex flex-col flex-wrap px-5 pb-12">
          <div className="flex w-full flex-col">
            <h1 className="text-2xl font-semibold">Edit Assignment</h1>

            <div className="mt-4 grid items-center gap-3 gap-y-5 sm:grid-cols-4">
              <div className="flex flex-col sm:col-span-3">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="khra">khra</option>
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="khra">khra</option>
                </select>
              </div>
              <div className="flex flex-col sm:col-span-3">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="French Toast">khra</option>
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="Toast with Strawberry Juice">khra</option>
                </select>
              </div>
              <div className="flex flex-col sm:col-span-3">
                <label className="mb-1 ml-3 font-semibold text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="t">khra</option>
                </select>
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-sm font-semibold uppercase text-gray-500" htmlFor="">
                  khra
                </label>
                <select className="rounded-lg border px-2 py-2 shadow-sm outline-none focus:ring" name="" id="">
                  <option value="Toast with Strawberry Juice">khra</option>
                </select>
              </div>
              <label className="mb-4 flex items-center" htmlFor="">
                <input className="accent-blue-700 mr-3 h-5 w-5" type="checkbox" name="" id="" />
                khra
              </label>
            </div>
            <div className="flex flex-col justify-between sm:flex-row">
              <button className="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300">
                Cancel
              </button>
              <button className="group my-2 flex w-full items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white outline-none transition sm:order-1 sm:w-40 focus:ring">
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:translate-x-2 ml-4 h-4 w-4 transition-transhtmlForm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BookModal>
  );
};

export default EditAssignment;
