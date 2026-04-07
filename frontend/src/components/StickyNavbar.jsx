import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function StickyNavbar({ isLoggedIn, onLogout }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLogout = () => {
    onLogout();
    setOpenDropdown(false);
    navigate("/");
  };

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Logo */}
        <Link to="/">
          <Typography className="cursor-pointer py-1.5 font-medium">
            Material Tailwind
          </Typography>
        </Link>

        <div className="flex items-center gap-4">
          {/* Auth */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full"
                />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="text" size="sm">
                Log In
              </Button>
            </Link>
          )}

          {/* Mobile button */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav open={openNav}>
        {!isLoggedIn ? (
          <Link to="/login">
            <Button fullWidth variant="text" size="sm">
              Log In
            </Button>
          </Link>
        ) : (
          <Button fullWidth color="red" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </MobileNav>
    </Navbar>
  );
}
