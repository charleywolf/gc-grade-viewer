"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { Category } from "@/lib/types";
import CategoryItem from "./CategoryItem";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { triggerFormModal } from "@/components/FormModal";

export default function CategoryList({
  defaultCategories,
  setDirty,
}: {
  defaultCategories: Category[];
  setDirty: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentCategories, setCategories] =
    useState<Category[]>(defaultCategories);
  const categoryNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const text = e.target.value;

    const updatedCategories = currentCategories.map((category, index) =>
      index === ind ? { ...category, name: text } : category
    );
    setCategories(updatedCategories);

    setDirty(true);
  };

  const addCategory = () => {
    setCategories([...currentCategories, { name: "", weight: 0 }]);
    setDirty(true);
  };

  const categoryWeightChange = (
    e: ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const weight = Number(e.target.value);

    if (!Number.isNaN(weight)) {
      setCategories((prevCategories) => {
        const totalWeight = prevCategories.reduce(
          (acc, cat, index) => acc + (index === ind ? weight : cat.weight),
          0
        );

        if (totalWeight > 100) {
          triggerFormModal(
            "The total weight of the categories cannot exceed 100!",
            false
          );
          return prevCategories;
        }

        const newCategories = [...prevCategories];
        newCategories[ind] = { ...newCategories[ind], weight: weight };
        return newCategories;
      });

      setDirty(true);
    }
  };

  return (
    <div className="w-full">
      {currentCategories.map((category, index) => (
        <CategoryItem
          key={index}
          name={category.name}
          weight={category.weight}
          index={index}
          onNameChange={categoryNameChange}
          onWeightChange={categoryWeightChange}
        />
      ))}
      <button
        type="button"
        onClick={addCategory}
        className="w-full flex justify-center items-center shadow shadow-gray-400 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl text-gray-800"
      >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Add Category
      </button>
    </div>
  );
}
