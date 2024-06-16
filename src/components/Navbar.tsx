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
    <nav className="w-full h-16 p-3 flex items-center text-gray-700 justify-center shadow-lg">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className={`${
            pathname === item.url
              ? "bg-blue-500 shadow-lg text-white"
              : "hover:bg-blue-500 hover:shadow-lg hover:text-white"
          } px-3 py-2 mx-2 rounded-xl font-bold`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
