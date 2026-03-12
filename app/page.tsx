import Card from "@/components/card";
import { createClient } from "@/supabase/client";
import { notFound } from 'next/navigation'

export const revalidate = 3600; //revalidate the page every 1 hour, this is a feature of next.js that allows us to cache the page for a certain amount of time and then revalidate it after that time has passed, this is useful for pages that have dynamic content that changes frequently, like our products page, so we don't have to fetch the data from the database every time the page is loaded, we can just cache it and then revalidate it after a certain amount of time has passed. This will improve the performance of our page and reduce the load on our database.

export default async function Home() {
  const supabase = createClient() //instance of supabase client

  const { data: topProducts, error: topProductsError } = await supabase
    .from('easysell-products')
    .select() //select all columns from the table
    .eq('boost', true) //filter the products that are boosted, this will return only the products that have the boost column set to true

  //here supabase is using fetch api internally and used force caching automatically.
  const { data: products, error } = await supabase.from('easysell-products').select() //name of the table in supabase

  if (!topProducts) {
    return (
      notFound()
    )
  }

  if (!products) {
    return notFound()
  }
  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <div className="px-20 pt-12 pb-20 text-gray-400">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">
              You can pay to boost your products here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
            {
              topProducts.map((product) => (
                <Card key={`${product.name}-${product.id}`}
                  {...product} //this is called spread operator, it will spread the properties of the product object as props to the Card component, so we don't have to write name={product.name} description={product.description} price={product.price} imageUrl={product.imageUrl} instead we can just spread the product object and it will automatically pass the properties as props to the Card component
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
                {...product}
              />
            ))
          }
        </div>
      </div>
    </main>
  );
}
