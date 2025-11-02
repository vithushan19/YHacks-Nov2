import React from 'react';
import { User } from './data';

interface UserCardProps {
  user: User;
  onCardClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onCardClick }) => {
  return (
    <div 
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/25 cursor-pointer"
      onClick={() => onCardClick(user)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onCardClick(user)}
      aria-label={`View details for ${user.name}`}
    >
      <img
        src={user.imageUrl}
        alt={`${user.name}'s profile picture`}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-600 object-cover"
      />
      <h2 className="text-xl font-bold text-white">{user.name}</h2>
      <p className="text-gray-400">{user.email}</p>
    </div>
  );
};

export default UserCard;