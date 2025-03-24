// import { Category, Grade } from "@/lib/types";
// import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
// import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// import GradeCategory from "./GradeCategory";
// import { determineLetterGrade } from "@/lib/helpers";

// export default function GradeTable({
//   currentGrades,
//   setGrades,
//   setDirty,
//   categories,
// }: {
//   currentGrades: Grade[];
//   setGrades: Dispatch<SetStateAction<Grade[]>>;
//   setDirty: Dispatch<SetStateAction<boolean>>;
//   categories: Category[];
// }) {
//   const addGrade = () => {
//     const updatedGrades = [...currentGrades];
//     updatedGrades.push({
//       name: "",
//       pointsEarned: 0,
//       pointsOutOf: 0,
//       category: null,
//     });

//     setGrades(updatedGrades);
//     setDirty(true);
//   };
//   const addSubtractButton = (index: number, type: "Subtract" | "Add") => {
//     const updatedGrades = [...currentGrades];
//     if (type === "Add") {
//       updatedGrades.splice(index + 1, 0, {
//         name: "",
//         pointsEarned: 0,
//         pointsOutOf: 0,
//         category: null,
//       });
//     } else {
//       updatedGrades.splice(index, 1);
//     }

//     setGrades(updatedGrades);
//     setDirty(true);
//   };

//   const updatePointsOutOf = (
//     e: ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const newPointsOutOf = Number(e.target.value);

//     if (isNaN(newPointsOutOf) || newPointsOutOf > 1000) return;

//     const newGrades = currentGrades.map((grade, idx) => {
//       if (idx === index) {
//         return {
//           ...grade,
//           pointsOutOf: newPointsOutOf,
//         };
//       }
//       return grade;
//     });

//     setGrades(newGrades);
//     setDirty(true);
//   };

//   const updatePointsEarned = (
//     e: ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const newPointsEarned = Number(e.target.value);

//     if (isNaN(newPointsEarned) || newPointsEarned > 1000) return;

//     const newGrades = currentGrades.map((grade, idx) => {
//       if (idx === index) {
//         return {
//           ...grade,
//           pointsEarned: newPointsEarned,
//         };
//       }
//       return grade;
//     });

//     setGrades(newGrades);
//     setDirty(true);
//   };

//   const updateCategory = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
//     const cat = e.target.value;

//     const newGrades = currentGrades.map((grade, idx) => {
//       if (idx === index) {
//         return {
//           ...grade,
//           category: cat,
//         };
//       }
//       return grade;
//     });

//     setGrades(newGrades);
//     setDirty(true);
//   };

//   return (
//     <div className="bg-slate-100 shadow-md shadow-gray-500 text-black rounded-xl p-3 overflow-x-auto container">
//       <div className="grid grid-cols-10 sm:grid-cols-11 gap-3 grades-table min-w-[1000px]">
//         <h2 className="col-span-3">Name</h2>
//         <h2 className="col-span-2">Points</h2>
//         <h2 className="col-span-3">Category</h2>
//         <h2 className="col-span-2">Percentage</h2>
//         <span className="hidden sm:block"></span>
//         {currentGrades.map((grade, index) => {
//           const percentage = grade.pointsEarned / grade.pointsOutOf;
//           return (
//             <Fragment key={index}>
//               <input
//                 name={`name-${index}`}
//                 defaultValue={grade.name}
//                 className="col-span-3 theme-input grades-item"
//               />
//               <div className="flex rounded-xl col-span-2 font-semibold">
//                 <input
//                   name={`pointsEarned-${index}`}
//                   className="w-[45%] theme-input rounded-xl py-2 px-3 text-center"
//                   value={grade.pointsEarned === 0 ? "" : grade.pointsEarned}
//                   onChange={(e) => updatePointsEarned(e, index)}
//                 />
//                 <span className="py-2 px-3 rounded-xl mx-2 text-slate-500 font-light">
//                   /
//                 </span>
//                 <input
//                   name={`pointsOutOf-${index}`}
//                   className="w-[45%] theme-input py-2 px-3 rounded-xl text-center"
//                   value={grade.pointsOutOf === 0 ? "" : grade.pointsOutOf}
//                   onChange={(e) => updatePointsOutOf(e, index)}
//                 />
//               </div>
//               <GradeCategory
//                 index={index}
//                 categories={categories}
//                 category={grade.category ?? undefined}
//                 updateCategory={updateCategory}
//               />
//               <div className="grades-item shadow shadow-gray-400 col-span-2 font-semibold relative">
//                 {/* START OF PERCENTAGE */}
//                 {isNaN(percentage) ? (
//                   "N/A"
//                 ) : (
//                   <>
//                     {percentage.toLocaleString("en-US", {
//                       style: "percent",
//                     })}
//                     <span className="mx-2 text-slate-500 font-light">-</span>

//                     {determineLetterGrade(percentage).letter}
//                   </>
//                 )}

//                 {/* END OF PERCENTAGE */}
//                 <div className="sm:hidden absolute right-0 flex items-center justify-center bg-slate-400 rounded-xl text-white">
//                   <PlusCircleIcon
//                     onClick={() => addSubtractButton(index, "Add")}
//                     className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
//                   />

//                   <MinusCircleIcon
//                     onClick={() => addSubtractButton(index, "Subtract")}
//                     className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
//                   />
//                 </div>
//               </div>

//               <div className="hidden right-0 sm:flex items-center justify-center bg-slate-400 rounded-xl text-white">
//                 <PlusCircleIcon
//                   onClick={() => addSubtractButton(index, "Add")}
//                   className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
//                 />

//                 <MinusCircleIcon
//                   onClick={() => addSubtractButton(index, "Subtract")}
//                   className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
//                 />
//               </div>
//             </Fragment>
//           );
//         })}
//         <button
//           type="button"
//           onClick={addGrade}
//           className="col-span-10 sm:col-span-11 w-full flex justify-center items-center shadow shadow-gray-400 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-gray-800"
//         >
//           <PlusCircleIcon className="h-6 w-6 mr-2" />
//           Add Grade
//         </button>
//       </div>
//     </div>
//   );
// }
