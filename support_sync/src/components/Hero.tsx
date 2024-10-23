import { useNavigate } from "react-router-dom";
import "../App.css";
import { BackgroundGradient } from "./Background"; 

const Hero = () => {
  const navigate = useNavigate();

  return (
    <BackgroundGradient className="hero">
      <div className="relative isolate px-6 pt-5 lg:px-8">
        {" "}
        {/* Reduced padding top */}
        <div className="mx-auto max-w-2xl py-20 pt-10 sm:py-32 lg:py-40">
          {" "}
          {/* Adjusted padding */}
          <div className="text-center">
            <h1 className="font-bold text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-500 sm:text-6xl  mb-10">
              Connect and Resolve with Ease
            </h1>

            <p className="mt-8 text-lg leading-8 font-bold text-gray-500 bg-white/40 backdrop-blur-md border border-white/30 p-16 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
              Discover solutions faster with our intelligent ticketing system.
              Streamline your support process and provide timely resolutions to
              your customers.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-md border-2 border-indigo-600 bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default Hero;
