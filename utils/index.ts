export const getCanonicalUrl = () => {
  return process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://easy-sell.vercel.app';
};

export const getImageUrl = (imageUrl: string) => {
  if (/^https?:\/\//.test(imageUrl)) {
    return imageUrl;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured.');
  }

  const storageBaseUrl = `${supabaseUrl}/storage/v1/object/public/storage/`;
  const imagePath = imageUrl.replace(/^\/+/, '');

  return `${storageBaseUrl}${imagePath}`;
};
