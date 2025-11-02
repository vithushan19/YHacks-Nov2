import React, { useState } from 'react';
import UserCard from './UserCard';
import UserModal from './UserModal';
import { users, User } from './data';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500">
              User Directory
            </span>
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            A list of our talented team members.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard 
              key={user.email} 
              user={user} 
              onCardClick={handleCardClick} 
            />
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default App;