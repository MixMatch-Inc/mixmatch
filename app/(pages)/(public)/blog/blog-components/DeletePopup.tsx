import React from 'react';

interface DeletePopupProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ onCancel, onConfirm }) => {
  return (
    <div
      onClick={onCancel} 
      className="fixed top-0 left-0 w-full bg-black bg-opacity-[60%] h-screen flex items-center justify-center p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[350px] h-[200px] rounded-lg bg-white flex flex-col items-center justify-center gap-3"
      >
        <p className="font-normal text-base text-[#535266] text-justify">
          Are you sure you want to delete this blog?
        </p>

        <div className="w-full max-w-[200px] flex items-center justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 w-[90px] rounded-sm text-white p-2"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-blue-600 w-[90px] rounded-sm text-white p-2"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
