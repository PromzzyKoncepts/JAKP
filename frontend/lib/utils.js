// lib/utils.js
export const getInitials = (name) => {
  if (!name) return 'US';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getRandomColor = () => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-yellow-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};