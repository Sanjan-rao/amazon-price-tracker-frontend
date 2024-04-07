import react from "react";
import Link from 'next/link';

export const Navbar = () => {
    return(
        <>
        <div className="navbar flex justify-between bg-black text-white p-5 border rounded-md">
            <div className="logo">Amazon Price Tracker</div>
            <ul className="flex gap-5">
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/'>About</Link></li>
                <li><Link href='/'>Contact Us</Link></li>
            </ul>
        </div>
        </>
    )
}