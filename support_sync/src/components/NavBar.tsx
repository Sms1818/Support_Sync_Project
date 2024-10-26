import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span
              className="font-bold text-xl cursor-pointer"
              onClick={handleLogoClick}
            >
              SupportSync
            </span>
          </div>
          <div>
            <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Settings</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
