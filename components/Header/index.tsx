"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState ,useContext} from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { signOut, useSession } from "next-auth/react" 
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {DataContext} from "../../components/DataProvider"
const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  //const [userCredits,setUserCredits]=useState(0);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index:any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const [openAcctMenu,setOpenAcctMenu] = useState(-1);

  const { data: session,status } = useSession();
/*
  const updateTotal = () =>{
    fetch("/api/getusercredits", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setUserCredits(data.total));

  }
  */

  const triggerCreditUpdate = ()=>
  {
    updateCreditsContext();
  }
  const{userCredits,updateCreditsContext} = useContext(DataContext);
  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-3/4 lg:w-1/4 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full flex ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo4.png"
                  alt="logo"
                  width={400}
                  height={400}
                  className="w-12 h-12 mr-2"
                  style={{
                    aspectRatio: "18/18",
                    objectFit: "cover",
                  }}
                />
                      <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-logo-blue-1 to-logo-blue-2"> DataVids </h1>
              </Link>
              
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                   
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                            <div
                              className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu && menuItem.submenu.map((submenuItem) => (
                                <Link
                                  href={submenuItem.path as string}
                                  key={submenuItem.id}
                                  className="block rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                     {navbarOpen && status!="authenticated" && (
                      <li key="s1" className="group relative">
                        <Link
                        href='/signin'
                        className={`flex py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                      >
                        Sign In
                      </Link>     
                      </li>
                    )}
                     {status=="authenticated" && (
                       <>
                          
                        <li key="s2" className="group relative">
                         
                         <Link
                         href="/view-my-requests"
                         className={`flex  cursor-pointer py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                       >
                         My Videos
                       </Link>     
                       </li>
                       <li key="s3" className="group relative">
                          <Link
                         href="/my-account"
                         className="flex  cursor-pointer py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0" 
                       >
                         My Account
                       </Link>
                     
                       </li>
                      
                      {session?.user?.role=="ADMIN" && (
                                    <li><Link
                                    href="/admin"
                                    className="flex  cursor-pointer py-2 text-base text-logo-blue-2 group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0" 
                                  >
                                    Admin
                                  </Link>
                                  </li>
                                )}
                      </>
                    )}
                  </ul>
                </nav>
              </div>
                        
              <div className="flex items-center justify-end pr-16 lg:pr-0">
              { status=="authenticated" && (
                <>
              {userCredits}<a href="/my-account"><Image width={30} height={30} src="/images/token.png" alt="Token"/></a>
              {/* <button onClick={(e)=>triggerCreditUpdate()}><ArrowPathIcon strokeWidth={2} className="h-4 w-4"/></button>*/}
                
                {/*
                <div className="group relative hidden lg:block">
                            <a
                              onClick={() => setOpenAcctMenu(1)}
                              className="flex  cursor-pointer items-center justify-between py-2 text-base text-dark dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                            >
                               {session?.user?.name}  
                              <span className="pl-3">
                                <svg width="15" height="14" viewBox="0 0 15 14">
                                  <path
                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </a>
                            
                            <div
                              className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openAcctMenu === 1 ? "block" : "block"
                              }`}
                            >
                               <Link
                                  href="/my-wallet"
                                  className="block cursor-pointer rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3" 
                                >
                                  Wallet
                                </Link>
                                <a  onClick={() => signOut()} 
                                    className="block cursor-pointer rounded py-2.5 text-sm text-dark hover:opacity-70 dark:text-white lg:px-3" >
                                  Logout
                                </a>
                               
                               
                              
                            </div>
                          
                  </div>
                            */}
                    </>
                ) }

            { status!="authenticated" && (
                <Link
                  href="/signin"
                  className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Sign In
                </Link>
            )}
                <div>
         
                  {/*<ThemeToggler />*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
