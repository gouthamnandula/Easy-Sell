"use server";
import { revalidatePath } from 'next/cache'; //this is a function from next.js that allows us to revalidate the page after we have made changes to the database, this is useful for our sell your item form, because after we have added a new product to the database, we want to revalidate the page so that the new product will be displayed on the products page without having to refresh the page manually.
import { redirect } from 'next/navigation';
import { createClient } from '@/supabase/server';
import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export async function sellYourItemAction(_prevState: any, formData: FormData) {

    const schema = z.object({
        name: z.string().min(6),
        description: z.string().min(10),
        contactEmail: z.string().min(1).email('This is not a valid email address'),
        price: z.string().min(1),
        imageUrl: z
            .any()
            .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                'Only .jpg, .jpeg, .png and .webp formats are supported.'
            ),
    });
    const validatedFields = schema.safeParse({
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
        const supabase = await createClient(); // Create a Supabase client instance
        const { data, error } = await supabase.storage
            .from('storage')
            .upload(fileName, imageUrl, {
                cacheControl: '3600',
                upsert: false,
            });
        if (error) {
            return {
                type: 'error',
                message: 'Failed to upload image. Please try again.',
            }
        }
        if (data) {
            const path = data.path;

            const { data: products } = await supabase
                .from('easysell-products')
                .insert({ name, description, price, imageUrl: path, contactEmail });

            console.log({ products });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            type: 'error',
            message: 'Failed to upload image. Please try again.',
        };
    }
    revalidatePath('/'); // Revalidate the home page to show the new product
    redirect('/');// Redirect to the home page after successfully adding the product
}
