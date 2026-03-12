import Link from "next/link"

function Header() {
  return (
    <header className="py-2 bg-gray-952">
        <div className="max-w-400 mx-auto px-12 flex justify-between">
            <Link href="/">
                <h1 className="heading-font text-gray-951 text-2xl text-center">Easy Sell</h1>
            </Link>
            <Link href="/products/upload" className="hover:bg-gray-951 hover:text-green-951 px-4 py-2 rounded-md transition-colors duration-300">
                Upload <>{">"}</>
            </Link>
        </div>
    </header>
    
  )
}

export default Header
