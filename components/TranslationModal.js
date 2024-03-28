"use client";
import { useState } from 'react';

const TranslationModal = ({ translation, setshowTranslation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    // setIsOpen(!isOpen);
    // setshowTranslation(true);
  };

  return (
    <div className="relative inline-block text-black text-base font-normal drop-shadow-none">
      <span className="cursor-pointer" onClick={toggleModal} onMouseEnter={() => setshowTranslation(true)} onMouseLeave={() =>setshowTranslation(false)}>
        <span className=" w-4 text-sm inline-block text-blue-500 hover:text-blue-600">
            ?
        </span>
      </span>
      {isOpen && (
        <div className="absolute bottom-10 left-2 z-5 w-80 h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">{translation.word}</h3>
            <p className="text-sm">{translation.translation}</p>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationModal;
