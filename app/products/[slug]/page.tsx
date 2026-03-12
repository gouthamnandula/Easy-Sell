import type { Metadata } from 'next';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/utils';

type Props = {
    params: Promise<{
        slug: string
    }>
};

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('easysell-products')
    .select()
    .match({ id: slug })
    .single();

  return { data, error };
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from('easysell-products').select('id');

  if (error) {
    throw new Error(`Failed to load product routes: ${error.message}`);
  }

  if (!products) {
    return [];
  }
 
  return products.map((product) => ({
    slug: String(product.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { data, error } = await getProduct(slug);

    if (error) {
        throw new Error(`Failed to load product metadata for ${slug}: ${error.message}`);
    }

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
    const { data, error } = await getProduct(slug);

    if (error) {
        throw new Error(`Failed to load product ${slug}: ${error.message}`);
    }

    if (!data) {
        notFound();
    }

    const imageSrc = getImageUrl(data.imageUrl);

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
                className="rounded-lg shadow-xl border-4 border-gray-200 p-2 lg:min-w-160 lg:min-h-120"
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
