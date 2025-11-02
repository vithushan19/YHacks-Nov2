import React from 'react';
import { User } from './data';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  // Stop propagation to prevent closing the modal when clicking inside it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-modal-title"
    >
      <div
        className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md m-4 p-8 text-center"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <img
          src={user.imageUrl}
          alt={`${user.name}'s profile picture`}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-500 object-cover"
        />
        <h2 id="user-modal-title" className="text-3xl font-bold text-white mb-1">{user.name}</h2>
        <p className="text-gray-400 mb-6">{user.email}</p>

        <div>
          <h3 className="text-lg font-semibold text-teal-400 mb-3">Interests</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="bg-gray-700 text-teal-300 text-sm font-medium px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;