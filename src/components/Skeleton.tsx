import clsx from "clsx";

export default function Skeleton({
  className,
  basic,
}: {
  className: string;
  basic?: boolean;
}) {
  return (
    <div
      className={clsx(
        className,
        "animate-pulse bg-slate-800",
        basic !== false ? "rounded-md" : ""
      )}
    />
  );
}
