"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", url: "/" },
  { name: "Premium", url: "/premium" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="w-full h-16 p-3 flex items-center text-gray-200 justify-center shadow-lg shadow-slate-800">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className={`${
            pathname === item.url
              ? "bg-slate-700 shadow shadow-gray-700 text-white"
              : "hover:bg-slate-700 hover:shadow hover:shadow-gray-700 hover:text-white"
          } px-3 py-2 mx-2 rounded-xl font-bold`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
