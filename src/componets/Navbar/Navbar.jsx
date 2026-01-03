import React from 'react';
import { NavLink } from 'react-router-dom'; // যদি রাউটিং ব্যবহার করেন

const Navbar = () => {
    // ১. মেনু আইটেমগুলোর জন্য একটি অ্যারে (Dynamic Links)
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    // ২. মেনু আইটেম তৈরির কমন ফাংশন (যাতে কোড ডুপ্লিকেট না হয়)
    const links = (
        <>
            {navLinks.map((link, index) => (
                <li key={index}>
                    <a href={link.path}>{link.name}</a>
                </li>
            ))}
            {/* সাব-মেনু বা অন্য আইটেম চাইলে এখানে যোগ করা যাবে */}
            <li>
                <details className="lg:block">
                    <summary>Parent</summary>
                    <ul className="p-2 bg-base-100 w-40 z-10">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* মোবাইল মেনু বাটন (Toggle) */}
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {/* মোবাইলের জন্য ড্রপডাউন মেনু */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold">daisyUI</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                {/* ডেস্কটপের জন্য হরিজন্টাল মেনু */}
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                <a className="btn bg-orange-500 text-white border-none hover:bg-orange-600">Login</a>
            </div>
        </div>
    );
};

export default Navbar;