import React from "react";
import ViewModal from "../../components/modal/ViewMonal";

interface CourseInfo {
  title: string;
  description: string;
  no_of_enrolled: number;
}
function CoursesInfo() {
  return (
    <ViewModal
    isVisible={false}
    onClose={() => {}}
    >
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-hidden">
        <div className="mx-auto max-w-screen-lg px-3 py-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold">
              here is where the title is rendered
            </h1>
            <p className="">here is where the description is rendered</p>

            <ul className="flex gap-4">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </li>
            </ul>
          </div>

          <div className="mt-10 bg-white py-2">
  <nav className="flex justify-center gap-4">
    <a
      href="#"
      className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
    >
      Announcements
    </a>

    <a
      href="#"
      className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out"
    >
      Curriculum
    </a>

    <a
      href="#"
      className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
    >
      Roster
    </a>
  </nav>
</div>


          <ul className="mt-2 space-y-4">
   <li className="text-left">
      <label htmlFor="accordion-2" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input className="peer hidden" type="checkbox" id="accordion-2" />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
          <h3 className="text-base font-bold text-gray-600 lg:text-base">blank for now</h3>
        </div>
        <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          
          
            <ul className="space-y-1 font-semibold text-gray-600 mb-6">
            
            </ul>
          
        </div>
      </label>
    </li>
    <li className="text-left">
      <label htmlFor="accordion-2" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input className="peer hidden" type="checkbox" id="accordion-2" />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
          <h3 className="text-base font-bold text-gray-600 lg:text-base">blank</h3>
        </div>
        <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          
          
            <ul className="space-y-1 font-semibold text-gray-600 mb-6">
            
            </ul>
          
        </div>
      </label>
    </li>
    <li className="text-left">
      <label htmlFor="accordion-3" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input className="peer hidden" type="checkbox" id="accordion-3" />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
          <h3 className="text-base font-bold text-gray-600 lg:text-base">blank</h3>
        </div>
        <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          
          
            <ul className="space-y-1 font-semibold text-gray-600 mb-6">
             
            </ul>
          
        </div>
      </label>
    </li>
    <li className="text-left">
      <label htmlFor="accordion-4" className="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input className="peer hidden" type="checkbox" id="accordion-4" />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
          <h3 className="text-base font-bold text-gray-600 lg:text-base">blank</h3>
        </div>
        <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          
          
            <ul className="space-y-1 font-semibold text-gray-600 mb-6">
              
            </ul>
          
        </div>
      </label>
    </li>
  </ul>
        </div>
        </div>
        
      </div>
    </ViewModal>
  );
}

export default CoursesInfo;
