"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/supabase/server';
import type { UploadFormState } from '@/app/products/upload/state';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const uploadSchema = z.object({
    name: z.string().trim().min(6, 'Name must be at least 6 characters long.'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters long.'),
    contactEmail: z.string().trim().min(1, 'Contact email is required.').email('This is not a valid email address'),
    price: z.string().trim().min(1, 'Price is required.'),
    imageUrl: z
        .custom<File>((file) => file instanceof File && file.size > 0, 'Image is required.')
        .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        ),
});

export async function sellYourItemAction(
    _prevState: UploadFormState,
    formData: FormData
): Promise<UploadFormState> {
    const validatedFields = uploadSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        contactEmail: formData.get('contactEmail'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
    });

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
        };
    }

    const { name, description, price, imageUrl, contactEmail } = validatedFields.data;
    const fileName = `products/${Date.now()}-${imageUrl.name}`;

    try {
        const supabase = await createClient();
        const { data, error } = await supabase.storage
            .from('storage')
            .upload(fileName, imageUrl, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            return {
                type: 'error',
                errors: null,
                message: 'Failed to upload image. Please try again.',
            };
        }

        const { error: insertError } = await supabase
            .from('easysell-products')
            .insert({ name, description, price, imageUrl: data.path, contactEmail });

        if (insertError) {
            await supabase.storage.from('storage').remove([data.path]);

            return {
                type: 'error',
                errors: null,
                message: 'Failed to save product details. Please try again.',
            };
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            type: 'error',
            errors: null,
            message: 'Failed to upload image. Please try again.',
        };
    }

    revalidatePath('/');
    redirect('/');
}
