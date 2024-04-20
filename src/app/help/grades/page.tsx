import HelpColumn from "@/components/help/HelpColumn";
import HelpHeader from "@/components/help/HelpHeader";

export default function gradesHelp() {
  return (
    <div className="container mx-auto mt-10 p-4">
      <HelpHeader title="How to Paste Grades" />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <HelpColumn
          src="diagram1.png"
          alt="Google Classroom"
          caption='Navigate to your class&apos;s Google Classroom page and click on
        "Classwork" in the topbar.'
        />
        <HelpColumn
          src="diagram2.png"
          alt="Google Classroom: Classwork page"
          caption='Click on the "View your work" button located under the topbar.'
        />
        <HelpColumn
          src="diagram3.png"
          alt="Google Classroom: View your work section"
          caption="Select all your grades as displayed and copy them using CTRL-C (or CMD-C on MacOS)."
        />
        <HelpColumn
          src="diagram4.png"
          alt="Google Classroom Grade Viewer"
          caption='Return to our website and paste in your grades under "Google Classroom Grades". Finally, click on "Calculate Average" and view the calculated grade in the top-right.'
        />
      </div>
    </div>
  );
}
