import React, { useState, useEffect } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavbarLinks } from "../../data/navbar-links";
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { AiOutlineShoppingCart } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSublinks = async () => {
        try {
            setLoading(true);
            const res = await fetchCourseCategories();
            setSubLinks(res);
        } catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white`}>            
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                <ul className='hidden sm:flex gap-x-6 text-richblack-25'>
                    {NavbarLinks.map((link, index) => (
                        link.title !== "Catalog" && (
                            <li key={index}>
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3`}>                                    
                                        {link.title}
                                    </p>
                                </Link>
                            </li>
                        )
                    ))}
                </ul>

                <div className="text-white">
                    <Dropdown>
                        <Dropdown.Toggle className="p-2" variant="success" id="dropdown-basic">
                            Catalog
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {loading ? (<p className="text-center">Loading...</p>) : subLinks.length ? (
                                subLinks.map((subLink, index) => (
                                    <Dropdown.Item key={index} href={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}>{subLink?.name}</Dropdown.Item>
                                ))
                            ) : (
                                <p className="text-black p-2 border-richblack-900 rounded-md border-[1px]">Nothing found</p>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='flex gap-x-4 items-center'>
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <>
                            <Link to="/login">
                                <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/login') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>Log in</button>
                            </Link>
                            <Link to="/signup">
                                <button className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${matchRoute('/signup') ? 'border-[2.5px] border-yellow-50' : 'border border-richblack-700 bg-richblack-800'}`}>Sign Up</button>
                            </Link>
                        </>
                    )}
                    {token !== null && <ProfileDropDown />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
