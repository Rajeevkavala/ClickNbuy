import { useState } from 'react';
import { ShoppingCart, ChevronDown, Facebook, Twitter, Instagram } from 'lucide-react';


const products = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, image: 'https://www.leafstudios.in/cdn/shop/files/1_6b54ff34-acdd-40e6-a08a-f2bfa33a1c7a_1000x.png' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/2/g/r/48-watch-ultra-orange-android-ios-mobirite-yes-original-imagk4cxc4chmxgc.jpeg' },
  { id: 3, name: 'Laptop', price: 999.99, image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/v/c/a/-original-imagfdfpnjjpdhq2.jpeg' },
  { id: 4, name: 'Smartphone', price: 699.99, image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/8/i/-original-imah4zp7fgtezhsz.jpeg' },
  { id: 5, name: 'Tablet', price: 349.99, image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/tablet/v/w/t/-original-imagu2mdexmnb7bw.jpeg' },
  { id: 6, name: 'Headphones', price: 149.99, image: 'https://m.media-amazon.com/images/I/710dy4BFjLL._AC_UY327_FMwebp_QL65_.jpg' },
];

const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Living'];


function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-black text-white ml-20 home-page-margin-left">
      {/* Main Content */}
      <div className="flex-1 pl-15">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-90" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find the Best Deals on Your Favorite Products
            </h1>
            <button className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors">
              Shop Now
            </button>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="bg-black py-4 sticky top-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Categories</h2>
              <div className="relative">
                <button 
                  className="md:hidden flex items-center space-x-1 bg-black px-4 py-2 rounded-md shadow"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>Select Category</span>
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
                <nav className="hidden md:flex space-x-4">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </nav>
                {isDropdownOpen && (
                  <nav className="md:hidden absolute top-full right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-2">
                    {categories.map((category) => (
                      <a
                        key={category}
                        href="#"
                        className="block px-4 py-2 text-gray-400 hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-black rounded-lg shadow-md overflow-hidden group">
                  <div className="relative">
                    {/* Set a fixed height for the product image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold mr-2 hover:bg-gray-300 hover:text-black transition-colors">
                        View Details
                      </button>
                      <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-primary/90 transition-colors">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-400">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">
                  We offer the best products at competitive prices. Shop with confidence!
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Policies</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Return Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
