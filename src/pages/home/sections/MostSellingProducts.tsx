import { ProductCard } from "../../../components/ProductCard";

const getTypeColor = (type: string) => {
  switch (type) {
    case "e-book":
      return "bg-blue-100 text-blue-600";
    case "chrome extension":
      return "bg-green-100 text-green-600";
    case "software plugin":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function MostSellingProducts() {
  const products = [
    {
      _id: "65345a98d3d9e8b7c6a54321",
      title: "Ultimate Web Dev Cheat Sheet E-Book 2024",
      description:
        "A comprehensive 500-page e-book covering HTML5, CSS3, JavaScript ES6+, and React best practices. Essential for junior to mid-level developers.",
      price: 29.99,
      isFree: false,
      type: "e-book",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=E-Book+Thumbnail",
        publicId: "e-book-thumb-1",
      },
      purchases: 5200,
      avgRating: 4.9,
      popularity: 8500,
    },
    {
      _id: "65345a98d3d9e8b7c6a54322",
      title: "Productivity Focus Mode Chrome Extension",
      description:
        "The best-selling tool to block distracting websites and manage time blocks using the Pomodoro technique directly in your browser.",
      price: 0.0,
      isFree: true,
      type: "chrome extension",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=Chrome+Extension",
        publicId: "chrome-ext-2",
      },
      purchases: 4150,
      avgRating: 4.7,
      popularity: 7900,
    },
    {
      _id: "65345a98d3d9e8b7c6a54323",
      title: "Advanced React State Management Plugin",
      description:
        "A lightweight npm package plugin designed for easy, scalable state management in complex React applications without using Redux.",
      price: 49.99,
      isFree: false,
      type: "software plugin",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=Software+Plugin",
        publicId: "plugin-3",
      },
      purchases: 3800,
      avgRating: 4.8,
      popularity: 7500,
    },
    {
      _id: "65345a98d3d9e8b7c6a54324",
      title: "Beginner's Guide to Digital Drawing (E-Book)",
      description:
        "Start your digital art journey! Covers fundamental techniques, software shortcuts, and includes 50 high-resolution practice sketches.",
      price: 19.99,
      isFree: false,
      type: "e-book",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=Digital+Art+Guide",
        publicId: "e-book-thumb-4",
      },
      purchases: 2950,
      avgRating: 4.5,
      popularity: 6200,
    },
    {
      _id: "65345a98d3d9e8b7c6a54325",
      title: "VS Code Tailwind CSS Snippet Library",
      description:
        "An essential productivity tool for web developers. Provides over 500 useful Tailwind CSS snippets and autocompletions for VS Code.",
      price: 5.99,
      isFree: false,
      type: "software plugin",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=VSCode+Snippets",
        publicId: "plugin-5",
      },
      purchases: 2500,
      avgRating: 4.6,
      popularity: 5800,
    },
    {
      _id: "65345a98d3d9e8b7c6a54326",
      title: "JavaScript Array Methods Quick Reference",
      description:
        "A compact, printable reference guide for all core JavaScript array methods, complete with examples and use cases for quick lookup.",
      price: 0.0,
      isFree: true,
      type: "others",
      thumbnail: {
        imageUrl: "https://via.placeholder.com/600x400?text=JS+Reference+Card",
        publicId: "other-6",
      },
      purchases: 2100,
      avgRating: 4.4,
      popularity: 5000,
    },
  ];

  const rangeText =
    products.length > 0
      ? `Showing ${products.length} Best Selling Products`
      : "No products available.";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Most Selling Digital Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {rangeText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              getTypeColor={getTypeColor}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="py-3 px-8 text-lg font-semibold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-300 shadow-lg">
            Explore All Products
          </button>
        </div>
      </div>
    </section>
  );
}
