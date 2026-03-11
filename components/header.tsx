    
import Link from "next/link"

function Header({font}: {font?: string}) {   //here i made it optional because i want to use the same header component in different pages and i dont want to pass the font prop every time  server comp yooo
  return (
    <header className="py-2 bg-green-951 ">
        <div className="max-w-400 mx-auto px-12 flex justify-between">
            <Link href="/">
                <h1 className={`text-gray-951 text-2xl text-center  ${font}`}>Easy Sell</h1>
            </Link>
            <Link href="/product/upload" className="hover:bg-gray-951 hover:text-green-951 px-4 py-2 rounded-md transition-colors duration-300">
                Upload
            </Link>
        </div>
    </header>
    
  )
}

export default Header
