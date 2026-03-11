import Card from "@/components/card";
import { createClient } from "@/supabase/client";

export default async function Home() {
  const supabase = createClient() //instance of supabase client
  //here supabase is using fetch api internally to make a request to the supabase backend and fetch data from the 'easysell-products' table
  const { data: products, error } = await supabase.from('easysell-products').select() //name of the table in supabase 
  if(!products) {
    return (
      <p>No products found</p>
    )
  }
  // const products = [
  //   {
  //     id:0,
  //     name: "Mushroom Lamp Orange",
  //     description: "Mushroom Lamp Orange - A charming and whimsical lighting fixture that adds a touch of playfulness to any space. This lamp features a mushroom-shaped design with a vibrant orange color, creating a warm and inviting ambiance. Perfect for bedrooms, living rooms, or as a unique accent piece in your home decor.",
  //     price: 49.99,
  //     imageUrl: "https://res.cloudinary.com/dkfnd7xy7/image/upload/v1708550271/Mushroom-Lamp-Orange-Lamp-Mushroom-Table-Lamp-Mid-Century-Modern-Style-Home-Decor_45568e91-86a0-4946-baeb-8cf9b0c54adc.ba8ddaa42de9ecc79d5046b14a59d84a_czhvfy.webp",
  //   },
  // ]
  return (
      <main className="min-h-screen">
        <div className="px-12 pt-12 pb-20 text-gray-400">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
            <div className="pt-12">
              <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
              <p className="text-xl">
                You can pay to boost your products here.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
              {
                products.map((product) => (
                  <Card key={`${product.name}-${product.id}`}
                   {... product} //this is called spread operator, it will spread the properties of the product object as props to the Card component, so we don't have to write name={product.name} description={product.description} price={product.price} imageUrl={product.imageUrl} instead we can just spread the product object and it will automatically pass the properties as props to the Card component
                   />
                ))
              }
            </div>
          </div>

          <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
                products.map((product) => (
                  <Card key={`${product.name}-${product.id}`}
                   {... product}
                   />
                ))
              }
          </div>
        </div>
      </main>
  );
}
