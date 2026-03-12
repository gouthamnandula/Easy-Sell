import type { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/utils';

type Props = {
    params: Promise<{ //next js updated params rules, now we have to use promise to get the params, this is a new feature of next js that allows us to use async/await to get the params, this is useful for cases when we need to fetch data from the database based on the params, so we can use async/await to fetch the data and then return the page with the fetched data, this will improve the performance of our page and reduce the load on our database because we are not fetching the data from the database every time the page is loaded, we are just fetching the data when we need it based on the params.
        slug: string
    }>
}

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('easysell-products')
    .select()
    .match({ id: slug })
    .single();

  return data;
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products } = await supabase.from('easysell-products').select();

  if (!products) {
    return []; //here we are returning an empty array if there are no products in the database, this will prevent the build from failing and it will just generate an empty page for the products, this is a good practice to handle the case when there are no products in the database, instead of throwing an error or generating a page with broken content, we can just generate an empty page and show a message to the user that there are no products available.
  }
 
  return products.map((product) => ({
    slug: product.id, //it tell to generate all routes with specific routes with the id of the product, so if we have 10 products in the database, it will generate 10 routes with the id of the product, so we can access the product page with the url /products/1, /products/2, /products/3 and so on, this is a feature of next.js that allows us to generate static pages for dynamic routes, so we can have a dynamic route for each product in our database and next.js will generate a static page for each product at build time, this will improve the performance of our page and reduce the load on our database because we are not fetching the data from the database every time the page is loaded, we are just generating a static page for each product at build time and then serving that static page to the user when they access the product page.
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getProduct(slug);

    if (!data) {
        return {
            title: 'Product Not Found | Easy Sell',
        };
    }

    const imageSrc = getImageUrl(data.imageUrl);
    const productPath = `/products/${data.id}`;
    const description = data.description.slice(0, 160);

    return {
        title: `${data.name} | Easy Sell`,
        description,
        alternates: {
            canonical: productPath,
        },
        openGraph: {
            title: data.name,
            description,
            url: productPath,
            siteName: 'Easy Sell',
            type: 'website',
            images: [
                {
                    url: imageSrc,
                    alt: data.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.name,
            description,
            images: [imageSrc],
        },
    };
}

export default async function page({ params }: Props) {
    const { slug } = await params;
    const data = await getProduct(slug);

    if (!data) {
        notFound();
    }
    const imageSrc = getImageUrl(data.imageUrl);
    // const data ={
    //   id:0,
    //   name: "Mushroom Lamp Orange",
    //   description: "Mushroom Lamp Orange - A charming and whimsical lighting fixture that adds a touch of playfulness to any space. This lamp features a mushroom-shaped design with a vibrant orange color, creating a warm and inviting ambiance. Perfect for bedrooms, living rooms, or as a unique accent piece in your home decor.",
    //   price: 49.99,
    //   imageUrl: "https://res.cloudinary.com/dkfnd7xy7/image/upload/v1708550271/Mushroom-Lamp-Orange-Lamp-Mushroom-Table-Lamp-Mid-Century-Modern-Style-Home-Decor_45568e91-86a0-4946-baeb-8cf9b0c54adc.ba8ddaa42de9ecc79d5046b14a59d84a_czhvfy.webp",
    //   contactEmail : "gouthamnandula@gmail.com",
    //   boost: true,
    // }
  return (
    <div className="px-12 py-12 max-w-7xl mx-auto min-h-screen text-gray-400">
        <div className="flex justify-between mb-6 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl items-start uppercase">
            {data.name}
            </h2>
            <a
            href={`mailto:${data.contactEmail}?subject=Interested in purchasing ${data.name}`}
            className="bg-orange-900 hover:bg-orange-950 text-white px-4 py-2 rounded-md hidden lg:flex"
            >
            Contact the Seller!
            </a>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
            <div className="flex items-center justify-center bg-white-100 shadow-xl">
                <Image
                className="rounded-lg shadow-xl border-4 border-gray-200 p-2 lg:min-w-[40rem] lg:min-h-[30rem]"
                width={600}
                height={600}
                alt={data.name}
                src={imageSrc}
                />
            </div>
            <div className="bg-gray-953 p-6 w-full">
                <label className="font-bold">💰 PRICE:</label>

                <p className="text-gray-800 text-2xl lg:text-3xl pt-4 py-6 text-center border-b-2 border-dashed border-gray-800 border-opacity-15">
                    ${data.price}
                </p>
                {data.boost && (
                    <div className="pt-4">
                        <label className="font-bold">⭐ PREMIUM PRODUCT:</label>

                        <p className="text-gray-800 text-2xl lg:text-3xl py-6 text-center border-b-2 border-dashed border-gray-800 border-opacity-15">
                            Yes
                        </p>
                    </div>
                )}
                <a href={`mailto:${data.contactEmail}`} className="bg-orange-900 hover:bg-orange-950 text-white px-4 py-2 rounded-md flex lg:hidden w-full items-center justify-center my-12">
                    Contact the Seller!
                </a>
            </div>
        </div>
        <div className="pt-6">
            <label className="font-bold pb-2 border-b-2 border-dashed border-gray-800 border-opacity-15">
                📝 DESCRIPTION:
            </label>

            <p className="text-gray-600 text-lg my-4 pt-4 pb-6">
                {data.description}
            </p>
        </div>
    </div>
  )
}
