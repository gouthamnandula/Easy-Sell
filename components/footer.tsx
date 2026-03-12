function Footer({font}: {font: string}) {
  return (
    <footer className="py-12 bg-gray-952 w-full">
        <div className="max-w-400 mx-auto px-12 flex justify-between">
            <p className={`text-gray-951 text-xl ${font}`}>&copy; 2024 Easy Sell. All rights reserved.</p>
        </div>

    </footer>
  )
}

export default Footer
