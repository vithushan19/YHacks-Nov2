
import React from 'react';

const App: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-8 rounded-lg shadow-2xl bg-gray-800 border border-gray-700">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500">
            Hello, YHacks!
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Welcome to your first React application.
        </p>
      </div>
    </main>
  );
};

export default App;
