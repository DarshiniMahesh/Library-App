// Mock API functions
export const searchBooks = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would be an API call
  return { success: true, data: [] };
};

export const getBookDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true, data: null };
};

export const borrowBook = async (bookId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'Book borrowed successfully!' };
};

export const returnBook = async (bookId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'Book returned successfully!' };
};
