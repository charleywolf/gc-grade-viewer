import { IconHelpCircleFilled } from "@tabler/icons-react";
import Link from "next/link";
// import { useState } from "react";

export default function LabelWithInfo({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  //   const [toolTip, setStatus] = useState<boolean>(true);

  return (
    <div className="flex items-center mb-2">
      <label className="block text-gray-700 font-bold">{title}</label>
      {href && (
        <Link href={href}>
          <IconHelpCircleFilled
            className="ml-2 text-gray-700 hover:text-gray-500"
            size={17}
          />
        </Link>
      )}
    </div>
  );
}
