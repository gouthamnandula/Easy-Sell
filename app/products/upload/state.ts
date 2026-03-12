export type UploadFormErrors = {
  name?: string[];
  price?: string[];
  description?: string[];
  imageUrl?: string[];
  contactEmail?: string[];
};

export type UploadFormState = {
  type?: 'error' | 'success';
  message: string;
  errors: UploadFormErrors | null;
};

export const initialUploadState: UploadFormState = {
  type: undefined,
  message: '',
  errors: null,
};
