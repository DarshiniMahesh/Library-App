export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : '0.0';
};

export const formatPrice = (price) => {
  return price || 'Free';
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
