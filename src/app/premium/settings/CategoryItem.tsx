"use client";

import { memo } from "react";

type CategoryItemProps = {
  name: string;
  weight: number;
  index: number;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onWeightChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

export default memo(function CategoryItem({
  name,
  index,
  weight,
  onNameChange,
  onWeightChange,
}: CategoryItemProps) {
  return (
    <div className="grid grid-cols-4 w-64 gap-2 mb-4">
      <input
        className="px-3 py-2 theme-input rounded-xl col-span-3"
        value={name}
        name={`category-name-${index}`}
        placeholder="Tests/Quizzes"
        onChange={(e) => onNameChange(e, index)}
      />
      <input
        className="px-3 py-2 theme-input rounded-xl w-15"
        name={`category-weight-${index}`}
        value={weight === 0 ? "" : weight}
        onChange={(e) => onWeightChange(e, index)}
        placeholder="80"
      />
    </div>
  );
});
