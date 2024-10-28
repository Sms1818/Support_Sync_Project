import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenuComp } from "./DropdownMenuComp";

const NavBar = () => {
  
  const navigate = useNavigate();

  const {isAuthenticated} = useAuth0();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="fixed z-50 top-0 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20">
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
            {isAuthenticated ? (
              <DropdownMenuComp />
            ) : (
              <Button variant="ghost">Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
