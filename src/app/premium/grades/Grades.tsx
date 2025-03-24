// "use client";

// import { Category, Grade } from "@/lib/types";
// import { useEffect, useState } from "react";

// import GradeTable from "./GradeTable";
// import clsx from "clsx";
// import customGrade from "@/lib/gradingSystems/custom";
// import { determineLetterGrade } from "@/lib/helpers";
// import { saveGrades } from "../Actions";
// import { triggerFormModal } from "@/components/FormModal";
// import { useFormState } from "react-dom";

// export default function Grades({
//   grades,
//   categories,
//   className,
// }: {
//   grades: Grade[];
//   categories: Category[];
//   className: string;
// }) {
//   const [state, formAction] = useFormState(saveGrades, null);
//   const [currentGrades, setGrades] = useState<Grade[]>(grades);
//   const [isDirty, setDirty] = useState<boolean>(false);

//   useEffect(() => {
//     if (isDirty) {
//       window.onbeforeunload = (e) => {
//         e.preventDefault();
//         e.returnValue = true;
//       };
//     }
//     return () => {
//       window.onbeforeunload = null;
//     };
//   }, [isDirty]);

//   useEffect(() => {
//     if (state && state.message) {
//       setDirty(false);
//       triggerFormModal("Saved changes!", true);
//     }
//   }, [state]);

//   const average = customGrade(currentGrades, categories);

//   return (
//     <>
//       {/* CLASS BANNER */}
//       <div className="banner mb-8">
//         <div className="flex items-center justify-center">
//           <div className="flex-col-center mr-8 sm:mr-16">
//             <span className="mb-1">Current Class:</span>
//             <span className="text-3xl font-semibold">{className}</span>
//           </div>
//           <div className="flex-col-center p-2 bg-blue-500 text-white rounded-xl">
//             <h1 className="text-4xl font-black">
//               {determineLetterGrade(average).letter}
//             </h1>
//             <h2 className="text-2xl font-bold">
//               {average.toLocaleString(undefined, {
//                 style: "percent",
//                 minimumFractionDigits: 2,
//               })}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* GRADE BANNER */}
//       <div className="banner mb-8 relative">
//         <form action={formAction} className="flex-col-center">
//           <div id="modal-container"></div>

//           {/* TITLE */}
//           <h2 className="text-2xl font-semibold mb-10">Grades</h2>

//           {/* TABLE */}
//           <GradeTable
//             currentGrades={currentGrades}
//             setGrades={setGrades}
//             setDirty={setDirty}
//             categories={categories}
//           />

//           {/* SAVE BUTTON */}
//           <button
//             type="submit"
//             disabled={!isDirty}
//             className={clsx(
//               "save-button",
//               !isDirty ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-200"
//             )}
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
