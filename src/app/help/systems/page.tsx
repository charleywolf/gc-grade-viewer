import HelpColumn from "@/components/help/HelpColumn";
import HelpHeader from "@/components/help/HelpHeader";

export default function system() {
  return (
    <div className="container mx-auto mt-10 p-4">
      <HelpHeader title="Grading Systems" />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <HelpColumn
          caption="All the points earned from any posted grades are divided by the total points possible."
          captionClassname="text-lg"
          title="Total Points"
        />
        <HelpColumn
          caption="Uses an 80:20 split for assessments and labs/homeworks. Grades are designated as assessments if it is out of more than 20."
          captionClassname="text-lg"
          title="Biology 513"
        />
        <HelpColumn
          caption="Custom allows you to create your own categories with different weights and manually assign them to each grade."
          title="(NEW!) Custom"
          captionClassname="text-lg"
        />
        <HelpColumn captionClassname="h-20" />
        <HelpColumn captionClassname="h-20" />
        <HelpColumn captionClassname="h-20" />
      </div>
    </div>
  );
}
