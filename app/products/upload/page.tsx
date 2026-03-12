'use client';
import { useActionState } from 'react';
import { sellYourItemAction } from '@/actions';
import SubmitButton from '@/components/submit-button'; //because it is using client we need to write our metadata by craeting another layout.tsx file and then we can use that layout to set the metadata for this page, because if we set the metadata in this page it will not work because this page is using client and metadata is only supported in server components, so we need to create a layout for this page and then set the metadata in that layout, and then we can use that layout in this page to set the metadata for this page, this is a workaround for the limitation of next.js that metadata is only supported in server components, but with this workaround we can still set the metadata for our client component pages.

const initialState = {
  message: '',
  errors: null,
};



const UploadFormPage: React.FC = () => {
  const [state, formAction] = useActionState(
    sellYourItemAction as any,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-gray-500">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">

        {/* Left Section */}
        <div className="pt-10">
          <h2 className="text-4xl font-semibold text-black mb-4 uppercase">
            Sell your <br /> Item!
          </h2>
          <p className="text-gray-700 max-w-sm text-xl">
            Enter details in this form to start selling your item.
          </p>
        </div>

        {/* Form Card */}
        
        <div className="bg-[#d8d1c7] shadow-md rounded-lg p-8 border border-gray-300">

          {state?.type === 'error' && (
            <p className="text-lg text-gray-700 mb-2 border-2 border-gray-300 rounded-md p-2 my-4 bg-green-951">
              {state.message}
            </p>
          )}

          <form action={formAction} className="space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 rounded-md border-2 border-dashed border-green-400 bg-gray-100 outline-none"
              />
              {state?.errors?.name && (
                <span id="name-error" className="text-red-600 text-sm">
                  {state.errors.name.join(',')}
                </span>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2 text-gray-800">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full p-3 rounded-md border-2 border-dashed border-green-400 bg-gray-100 outline-none"
              />
              {state?.errors?.price && (
                <span id="price-error" className="text-red-600 text-sm">
                  {state.errors.price.join(',')}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-gray-800">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full p-3 rounded-md border-2 border-dashed border-green-400 bg-gray-100 outline-none"
              />
              {state?.errors?.description && (
                <span id="description-error" className="text-red-600 text-sm">
                  {state.errors.description.join(',')}
                </span>
              )}
            </div>

            {/* Image */}
            <div>
              <label htmlFor="imageUrl" className="block mb-2 text-gray-800">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="imageUrl"
                name="imageUrl"
                className="w-full p-3 rounded-md border-2 border-dashed border-green-400 bg-gray-100"
              />
              {state?.errors?.imageUrl && (
                <span id="imageUrl-error" className="text-red-600 text-sm">
                  {state.errors.imageUrl.join(',')}
                </span>
              )}
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block mb-2 text-gray-800">
                Contact Email
              </label>
              <textarea
                id="contactEmail"
                name="contactEmail"
                rows={2}
                className="w-full p-3 rounded-md border-2 border-dashed border-green-400 bg-gray-100 outline-none"
              />
              {state?.errors?.contactEmail && (
                <span id="contactEmail-error" className="text-red-600 text-sm">
                  {state.errors.contactEmail.join(',')}
                </span>
              )}
            </div>

            <SubmitButton />

          </form>
        </div>

      </div>
    </div>
  );
};

export default UploadFormPage;