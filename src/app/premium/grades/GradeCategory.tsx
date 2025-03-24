// import { Category } from "@/lib/types";
// import { ChangeEvent } from "react";
// import { Select } from "@headlessui/react";

// export default function GradeCategory({
//   index,
//   category,
//   categories,
//   updateCategory,
// }: {
//   index: number;
//   category?: string;
//   categories: Category[];
//   updateCategory: (e: ChangeEvent<HTMLSelectElement>, index: number) => void;
// }) {
//   return (
//     <Select
//       className="col-span-3 py-2 px-3 theme-input flex rounded-xl bg-white appearance-none"
//       name={`category-${index}`}
//       defaultValue={category}
//       onChange={(e) => updateCategory(e, index)}
//     >
//       {categories.map((cat) => (
//         <option key={cat.name + cat.weight} value={cat.name}>
//           {cat.name}
//         </option>
//       ))}
//     </Select>
//   );
// }
