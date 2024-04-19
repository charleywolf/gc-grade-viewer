import Image from "next/image";
import { classNames } from "@/lib/helpers";

export default function HelpColumn({
  src,
  alt,
  caption,
  title,
  captionClassname,
}: {
  src?: string;
  title?: string;
  alt?: string;
  captionClassname?: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center text-white bg-gray-800 rounded-lg">
      {title && <h1 className="mt-3 text-xl font-bold mb-1">{title}</h1>}
      {src && alt && (
        <Image
          className="width-auto height-auto px-2 pt-2 mb-3"
          src={"/assets/" + src}
          width={500}
          height={500}
          alt={alt}
        />
      )}
      <figcaption
        className={classNames(
          "text-sm px-2 mb-3 text-center",
          captionClassname ? captionClassname : ""
        )}
      >
        {caption}
      </figcaption>
    </div>
  );
}
