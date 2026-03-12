import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils';
interface CardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}




function Card({id, name, description, imageUrl, price }: CardProps) {
  const imageSrc = getImageUrl(imageUrl);
  return (
    <Link href={`/products/${id}`} className="max-w-sm bg-gray-953 rounded-md overflow-hidden h-full flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
        <div className="max-w-sm bg-gray-953 rounded-md overflow-hidden h-full flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
        <div>
          <div className="relative h-96 bg-center"> {/* //125 is the width of the image container and 96 is the height of the image container, you can adjust it according to your needs */}
            <Image
              src={imageSrc}
              fill //now we can keep the aspect ratio of the image and it will fill the container(just fill is enough to make it responsive)
              style={{objectFit: "cover"}} //this will make sure that the image covers the entire container without distorting it
              alt={`Image of ${name}`}
              className='rounded-t'
            />
          </div>

          <div className="px-6 py-4">
            <div className="text-xl mb-2 uppercase line-clamp-2 font-bold text-gray-700">
              {name}
            </div>

            <p className="text-gray-700 text-base truncate uppercase">
              {description}
            </p>

          </div>
          <div className="px-6 py-2">
              <span className="inline-block text-xl text-gray-700 mr-2">
                ${price}
              </span>
            </div>
        </div>
      </div>
    </Link>
  );
}

export default Card
