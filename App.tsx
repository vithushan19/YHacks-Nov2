import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import UserModal from './UserModal';
import { users as mockUsers, User } from './data';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTXkwex5ZTd1yU3Lzqvl6yqaeBmG3XLXe0FXlnjnsfYaR6-zaQbVNmAVcHcv-63-gWdWDNH2fP7GS1M/pub?output=csv';

// Helper function to parse CSV data robustly
const parseCSV = (text: string): User[] => {
  try {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let field = '';
    let inQuotes = false;
    const normalizedText = text.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    for (let i = 0; i < normalizedText.length; i++) {
        const char = normalizedText[i];
        const nextChar = normalizedText[i + 1];

        if (inQuotes) {
            if (char === '"' && nextChar === '"') { // Escaped quote
                field += '"';
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentRow.push(field);
                field = '';
            } else if (char === '\n') {
                currentRow.push(field);
                rows.push(currentRow);
                currentRow = [];
                field = '';
            } else {
                field += char;
            }
        }
    }
    // Add the last field and row if the file doesn't end with a newline
    if (field || currentRow.length) {
        currentRow.push(field);
        rows.push(currentRow);
    }
    
    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim());
    
    const requiredHeaderMap: { [key: string]: number } = {
      'First Name': headers.indexOf('First Name'),
      'Last Name': headers.indexOf('Last Name'),
      'Email': headers.indexOf('Email'),
      'Image': headers.indexOf('Image'),
      'Interests': headers.indexOf('Interests'),
    };
    
    // Validate that all required headers are present
    for (const header in requiredHeaderMap) {
      if (requiredHeaderMap[header] === -1) {
        console.warn(`CSV missing optional header: ${header}`);
      }
    }

    return rows.slice(1).map((values, index) => {
      const firstName = values[requiredHeaderMap['First Name']]?.trim() || '';
      const lastName = values[requiredHeaderMap['Last Name']]?.trim() || '';
      const email = values[requiredHeaderMap['Email']]?.trim() || '';
      let imageUrl = values[requiredHeaderMap['Image']]?.trim() || '';
      const interestsStr = values[requiredHeaderMap['Interests']]?.trim() || '';

      const name = `${firstName} ${lastName}`.trim();
      
      // A user must have at least a name or an email to be useful
      if (!name && !email) {
        return null;
      }

      const id = email || `csv-user-${index}`;

      if (!imageUrl) {
        // Provide a consistent placeholder avatar based on the user's unique ID
        imageUrl = `https://i.pravatar.cc/256?u=${id}`;
      }

      return {
        id,
        name: name || 'N/A',
        email: email,
        imageUrl: imageUrl,
        interests: interestsStr ? interestsStr.split(';').map(i => i.trim()).filter(i => i) : [],
      };
    }).filter((user): user is User => user !== null);
  } catch(e) {
    console.error("Error parsing CSV:", e);
    return []; // Return empty array on parsing error
  }
};


const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedUsers = parseCSV(csvText);

        // Prevent adding duplicate users based on ID
        const newUsers = parsedUsers.filter(newUser => 
          !allUsers.some(existingUser => existingUser.id === newUser.id)
        );

        setAllUsers(prevUsers => [...prevUsers, ...newUsers]);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred while fetching data.");
        }
        console.error("Failed to fetch or parse sheet data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
            aria-label="Search for users by name or email"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onCardClick={handleCardClick} 
            />
          ))}
        </div>

        {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center mt-8">
                <p className="text-lg text-gray-400">No users found matching your search.</p>
            </div>
        )}

        {isLoading && (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-400 animate-pulse">Loading new members...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-8 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-lg text-red-300">Error: {error}</p>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default App;