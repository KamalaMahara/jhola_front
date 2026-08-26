import { useEffect, useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCartItems } from '../../../../store/cartSlice';
import { fetchMyProfile } from '../../../../store/authSlice';
import logo from "../../../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../../store/authSlice"



const Navbar = () => {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { user } = useAppSelector((store) => store.auth);
  const { items } = useAppSelector((store) => store.cart)
  const localStorageToken = localStorage.getItem("tokenHoYo");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    setIsLoggedIn(!!reduxToken || !!localStorageToken);
    if (isLoggedIn) {
      dispatch(fetchCartItems());
      dispatch(fetchMyProfile());
    }
  }, [reduxToken, localStorageToken, isLoggedIn]);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' }
  ];

  return (
    <nav className="bg-[#111827] text-[#F9FAFB] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">

            <span className="text-2xl font-bold tracking-tight">
              <img src={logo} alt="Project Logo" className="h-22 w-auto object-contain" />

            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#F59E0B] transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-800 text-sm rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] w-48 lg:w-64 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-[#F59E0B]" />
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3 pl-6">
              {isLoggedIn ? (
                <>
                  {/* Cart - customers only */}
                  {user?.role !== "admin" && (
                    <div className="flex items-center space-x-4 border-r border-amber-700 pr-4 mr-6">
                      <div className="relative cursor-pointer hover:text-[#F59E0B] transition-colors">
                        <Link to='/my-cart'>
                          <ShoppingCart className="h-6 w-6" />
                          <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#111827] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {items.length > 0 ? items.length : 0}
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 text-sm font-medium hover:text-[#F59E0B] focus:outline-none"
                    >
                      {user?.profileImageUrl ? (
                        <img
                          src={`http://localhost:8000/${user.profileImageUrl}`}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                          <User className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-[#1F2937] border border-gray-700 rounded-xl shadow-xl py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-700 mb-2">
                          <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          My Profile
                        </Link>
                        {user?.role !== "admin" && (
                          <Link
                            to="/my-orders"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            My Orders
                          </Link>
                        )}
                        {user?.role !== "admin" && (
                          <Link
                            to="/my-cart"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                          >
                            My Cart
                          </Link>
                        )}
                        <div className="border-t border-gray-700 mt-2 pt-2">
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              handleLogout();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <button className="bg-[#F59E0B] text-[#111827] px-4 py-2 rounded-md text-sm font-bold hover:bg-opacity-90 transition-all">
                      Register
                    </button>
                  </Link>
                  <Link to='/login'>
                    <button className="text-sm font-medium hover:text-[#F59E0B]">Login</button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Search className="h-6 w-6 text-gray-400" />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111827] border-t border-gray-800 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block px-3 py-4 text-base font-medium border-b border-gray-800">
              {link.name}
            </a>
          ))}
        <div className="pt-4 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium border-b border-gray-800 hover:text-[#F59E0B]"
                >
                  My Profile
                </Link>
                {user?.role !== "admin" && (
                  <Link
                    to="/my-orders"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-base font-medium border-b border-gray-800 hover:text-[#F59E0B]"
                  >
                    My Orders
                  </Link>
                )}
                <Link
                  to="/my-cart"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium border-b border-gray-800 hover:text-[#F59E0B]"
                >
                  My Cart ({items.length})
                </Link>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full text-left px-3 py-3 text-base font-medium text-red-400 hover:text-red-300 mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-center py-3 font-medium hover:text-[#F59E0B]">Login</button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#F59E0B] text-[#111827] py-3 rounded-md font-bold">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;