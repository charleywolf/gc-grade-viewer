import { ordinal_suffix_of } from "@/app/utils/formatter";

export default function Footer({ views }: { views: number }) {
  return (
    <footer className="bg-gray-800 mt-16">
      <div className="mx-auto max-w-5xl p-8 lg:px-16 text-center leading-relaxed text-gray-400">
        <p className="mx-auto mt-6 mb-3 text-sm">
          This is an independent tool and is not affiliated with or endorsed by
          Scarsdale High School or any public institution.
        </p>
        <p className="mx-auto mb-3 text-sm">
          While every effort has been made to ensure the accuracy of the
          calculations provided, users should verify their results
          independently. The creator of this tool make no guarantees regarding
          the accuracy, completeness, or reliability of the calculations.
        </p>
        <p className="mx-auto text-xs mt-5 font-bold">
          You are our {ordinal_suffix_of(views)} visitor!
        </p>
      </div>
    </footer>
  );
}
