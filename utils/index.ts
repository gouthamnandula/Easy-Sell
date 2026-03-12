export const getCanonicalUrl = () => {
  return process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://easy-sell.vercel.app';
};

export const getImageUrl = (imageUrl: string) => {
  const storageBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/`;
  const imagePath = imageUrl.replace(storageBaseUrl, '');

  return `${storageBaseUrl}${imagePath}`;
};
