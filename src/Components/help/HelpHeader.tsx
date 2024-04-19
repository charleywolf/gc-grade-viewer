import { IconArrowBadgeLeftFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function HelpHeader({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center">
      <Link href="/" className="hover:text-gray-500">
        <IconArrowBadgeLeftFilled size={40} />
      </Link>
      <header className="text-4xl font-bold flex-grow text-center">
        {title}
      </header>
    </div>
  );
}
