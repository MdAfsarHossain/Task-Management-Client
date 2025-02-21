import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";

// const themes = {
//     light: "light",
//     sunthwave: "sunthwave",
// };

// const getThemeFromLocalStorage = () => {
//     return localStorage.getItem("theme") || themes.light;
// };


const Navbar = () => {

    // const [theme, setTheme] = useState(getThemeFromLocalStorage());

    // const handleTheme = () => {
    //     const { light, sunthwave } = themes;
    //     const newTheme = theme === light ? sunthwave : light;
    //     document.documentElement.setAttribute("data-theme", theme);
    //     setTheme(newTheme);
    // };

    // useEffect(() => {
    //     document.documentElement.setAttribute("data-theme", theme);
    //     localStorage.setItem("theme", theme);
    // }, [theme]);

    const { user, logOut } = useAuth() || {};

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-green-500 text-white px-4 py-2 rounded-full font-bold"
                            : `px-4 py-2 font-bold `
                    }
                >
                    Home
                </NavLink>
            </li>
            {/* <li>
                <NavLink
                    to="/all-scholarships"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-green-500 text-white px-4 py-2 rounded-full font-bold"
                            : `px-4 py-2 font-bold`
                    }
                >
                    All Scholarships
                </NavLink>
            </li> */}

            {/* {
                user &&
                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-green-500 text-white px-4 py-2 rounded-full font-bold"
                                : `px-4 py-2 font-bold`
                        }
                    >
                        Profile
                    </NavLink>
                </li>
            } */}
        </>
    );


    return (
        <div
            className={`md:px-5 border- drawer z-50  transition-all duration-300 ${scrolled
                ? "fixed top-0 left-0 backdrop-blur-md bg-white bg-opacity-50 shadow-lg"
                : "fixed top-0 left-0 bg-transparent"
                }`}
        >
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar  w-full">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    {/* Navbar */}
                    <div className="navbar flex flex-row justify-between">
                        <div className="flex-0 border-0">
                            <Link to="/" className={`text-2xl md:text-3xl uppercase font-bold `}>
                                Task<span className="text-green-500">Manage</span>
                            </Link>
                        </div>
                        <div className="flex-none flex flex-row justify-between lg:items-center border-0">
                            {/* Navbar Routes */}
                            <div className="hidden lg:flex">
                                <ul className="flex flex-row px-1 gap-5">{links}</ul>
                            </div>
                            {/* End of Navbar Routes */}

                            {!user ? (
                                <div className="flex justify-between md:flex-row md:gap-5">
                                    <Link to="/login">
                                        <li className="btn bg-green-500 text-white border-2 border-green-500 hover:bg-transparent hover:border-green-500 hover:text-green-500">
                                            Login
                                        </li>
                                    </Link>
                                    <Link to="/register"
                                        className="hidden md:block"
                                    >
                                        <li className="btn bg-blue-300 text-black border-2 border-blue-300 hover:bg-transparent hover:border-blue-300 hover:text-black">
                                            Register
                                        </li>
                                    </Link>
                                </div>
                            ) : (
                                <>

                                    {/*  Dashboard */}
                                    {/* <div className="dropdown dropdown-bottom dropdown-end hidden md:block mr-4">
                                        <div tabIndex={0} role="button" className="m-1 flex flex-row justify-center items-center gap-3 border-0 px-2 py-1 rounded-md  font-bold text-green-500 text-4xl"><RxDashboard /> <span className="hidden"><IoIosArrowDown /></span></div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                                            <li>
                                                <NavLink
                                                    to="/add-artifact"
                                                    className="mb-1"
                                                >
                                                    Add Artifacts
                                                </NavLink>
                                            </li>
                                            <li className="mb-1"><NavLink
                                                to='/my-artifacts'
                                            >My Artifacts</NavLink></li>
                                            <li><NavLink
                                                to='/liked-artifacts'
                                            >Liked Artifacts</NavLink></li>
                                        </ul>
                                    </div> */}

                                    {/* Profile */}
                                    <div className="dropdown dropdown-hover dropdown-end lg:dropdown-end lg:mr-0 lg:ml-16">
                                        <div tabIndex={0} role="button" className="">
                                            <div className="avatar">
                                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                                    <img
                                                        src={
                                                            user?.photoURL
                                                                ? user.photoURL
                                                                : "../../public/user-avatar-male-5.png"
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow flex flex-col gap-2"
                                        >
                                            <li>
                                                <a className="font-bold">{user?.displayName}</a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => logOut()}
                                                    className="btn bg-red-500 text-white hover:bg-transparent border-2 border-red-500 hover:border-red-500 hover:text-red-500"
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* End of My Profile */}
                                </>
                            )}

                            {/* <div className="hidden lg:block">
                <label className="swap swap-rotate ml-5">
                  <input
                    onChange={handleTheme}
                    type="checkbox"
                  />
                  <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div> */}
                        </div>
                        {/* Navbar End */}
                    </div>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-svh w-80 p-4">
                    {/* Sidebar content here */}
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;