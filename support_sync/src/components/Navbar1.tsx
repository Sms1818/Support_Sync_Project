import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Logo } from "./Logo.tsx";

export default function App() {
  return (
    <Navbar className="w-full py-4 bg-gray-800 text-violet-400" isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit text-xl">SUPPORT SYNC</p> {/* Increased text size */}
      </NavbarBrand>

      <NavbarContent className="ml-auto"> {/* This class pushes the content to the right */}
        <NavbarItem>
          <Link href="#" color="secondary" className="text-lg"> {/* Increased text size */}
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary" className="text-lg">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="secondary" className="text-lg">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
