"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { Category } from "@/lib/types";
import CategoryItem from "./CategoryItem";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { triggerFormModal } from "@/components/FormModal";

export default function CategoryList({
  defaultCategories,
  currentCategoriesA,
  setCategoriesA,
  setDirty,
}: {
  defaultCategories?: Category[];
  currentCategoriesA?: Category[];
  setCategoriesA?: Dispatch<SetStateAction<Category[]>>;
  setDirty?: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentCategoriesB, setCategoriesB] = useState<Category[]>(
    defaultCategories ?? []
  );

  let current = currentCategoriesB;
  let set = setCategoriesB;

  if (currentCategoriesA !== undefined && setCategoriesA !== undefined) {
    current = currentCategoriesA;
    set = setCategoriesA;
  }
  const categoryNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const text = e.target.value;

    const updatedCategories = current.map((category, index) =>
      index === ind ? { ...category, name: text } : category
    );
    set(updatedCategories);

    setDirty && setDirty(true);
  };

  const addCategory = () => {
    set([...current, { name: "", weight: 0 }]);
    setDirty && setDirty(true);
  };

  const categoryWeightChange = (
    e: ChangeEvent<HTMLInputElement>,
    ind: number
  ) => {
    const weight = Number(e.target.value);

    if (!Number.isNaN(weight)) {
      set((prevCategories) => {
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

      setDirty && setDirty(true);
    }
  };

  return (
    <div className="w-full">
      {current.map((category, index) => (
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
