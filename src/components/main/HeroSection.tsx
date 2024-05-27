import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('./hero-image.jpg')" }}
    >
      <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-80">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-4">Naturally Radiant Skin</h2>
          <p className="text-xl mb-8">
            Discover our exclusive range of natural skincare products.
          </p>
          <Link
            to="/search"
            className="bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-200"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
