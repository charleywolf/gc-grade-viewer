import { ordinal_suffix_of } from "@/lib/formatter";

export default function Footer({ views }: { views: number }) {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-center leading-relaxed text-gray-500">
        <p className="mx-auto mt-6 mb-3">
          The Google Classroom Grade Calculator is an independent tool and is
          not affiliated with or endorsed by Scarsdale High School or any public
          institution.
        </p>
        <p className="mx-auto mb-3">
          While every effort has been made to ensure the accuracy of the
          calculations provided by the Google Classroom Grade Calculator, users
          should verify their results independently. The creator of this tool
          make no guarantees regarding the accuracy, completeness, or
          reliability of the calculations.
        </p>
        <p className="mx-auto text-xs mt-5">
          You are our {ordinal_suffix_of(views)} visitor!
        </p>
      </div>
    </footer>
  );
}
