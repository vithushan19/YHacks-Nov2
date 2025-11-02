export interface User {
  name: string;
  email: string;
  imageUrl: string;
  interests: string[];
}

export const users: User[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256',
    interests: ['AI Research', 'Quantum Computing', 'Photography'],
  },
  {
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256',
    interests: ['Mountain Biking', 'Craft Beer', 'Woodworking'],
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256',
    interests: ['Jazz Music', 'Creative Writing', 'Vintage Cars'],
  },
  {
    name: 'Diana Miller',
    email: 'diana.m@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256',
    interests: ['Graphic Design', 'Urban Exploration', 'Yoga'],
  },
    {
    name: 'Ethan Davis',
    email: 'ethan.d@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256',
    interests: ['Backend Development', 'Hiking', 'Cooking'],
  },
  {
    name: 'Fiona Garcia',
    email: 'fiona.g@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256',
    interests: ['Data Science', 'Traveling', 'Pottery'],
  },
  {
    name: 'George Rodriguez',
    email: 'george.r@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256',
    interests: ['Cybersecurity', 'Chess', 'Film Noir'],
  },
  {
    name: 'Hannah Martinez',
    email: 'hannah.m@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256',
    interests: ['UX/UI Design', 'Baking', 'Gardening'],
  },
];