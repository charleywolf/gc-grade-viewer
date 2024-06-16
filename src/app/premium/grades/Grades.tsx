"use client";

import { Category, Grade } from "@/lib/types";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import GradeCategory from "./GradeCategory";
import customGrade from "@/lib/gradingSystems/custom";
import { determineLetterGrade } from "@/lib/helpers";
import { saveGrades } from "../Actions";
import { triggerFormModal } from "@/components/FormModal";
import { useFormState } from "react-dom";

export default function Grades({
  grades,
  categories,
  className,
}: {
  grades: Grade[];
  categories: Category[];
  className: string;
}) {
  const [state, formAction] = useFormState(saveGrades, null);
  const [currentGrades, setGrades] = useState<Grade[]>(grades);
  const [isDirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = true;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  useEffect(() => {
    if (state && state.message) {
      setDirty(false);
      triggerFormModal("Saved changes!", true);
    }
  }, [state]);

  const addSubtractButton = (index: number, type: "Subtract" | "Add") => {
    const updatedGrades = [...currentGrades];
    if (type === "Add") {
      updatedGrades.splice(index + 1, 0, {
        name: "",
        pointsEarned: 0,
        pointsOutOf: 0,
        category: null,
      });
    } else {
      updatedGrades.splice(index, 1);
    }

    setGrades(updatedGrades);
    setDirty(true);
  };

  const updatePointsOutOf = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPointsOutOf = Number(e.target.value);

    if (isNaN(newPointsOutOf) || newPointsOutOf > 1000) return;

    const newGrades = currentGrades.map((grade, idx) => {
      if (idx === index) {
        return {
          ...grade,
          pointsOutOf: newPointsOutOf,
        };
      }
      return grade;
    });

    setGrades(newGrades);
    setDirty(true);
  };

  const updatePointsEarned = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPointsEarned = Number(e.target.value);

    if (isNaN(newPointsEarned) || newPointsEarned > 1000) return;

    const newGrades = currentGrades.map((grade, idx) => {
      if (idx === index) {
        return {
          ...grade,
          pointsEarned: newPointsEarned,
        };
      }
      return grade;
    });

    setGrades(newGrades);
    setDirty(true);
  };

  const updateCategory = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const cat = e.target.value;

    const newGrades = currentGrades.map((grade, idx) => {
      if (idx === index) {
        return {
          ...grade,
          category: cat,
        };
      }
      return grade;
    });

    setGrades(newGrades);
    setDirty(true);
  };

  const average = customGrade(currentGrades, categories);

  return (
    <>
      <div className="w-screen bg-slate-100 p-5 sm:p-10 mb-16">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center mr-8 sm:mr-16">
              <h3>Current Class:</h3>
              <h2 className="text-3xl text-black font-semibold">{className}</h2>
            </div>
            <div className="flex p-2 flex-col items-center bg-blue-500 text-white rounded-xl">
              <h1 className="text-4xl md:text-2xl lg:text-4xl font-black">
                {determineLetterGrade(average).letter}
              </h1>
              <h2 className="text-2xl md:text-xl lg:text-2xl font-bold">
                {average.toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen relative bg-slate-100 p-5 sm:p-10 mb-16">
        <form
          action={formAction}
          className="flex flex-col justify-center items-center"
        >
          <div id="modal-container" />
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-10">Grades</h2>
          {/* TABLE */}
          <div className="bg-slate-200 rounded-xl p-3 overflow-x-auto container">
            <div className="grid grid-cols-10 sm:grid-cols-11 gap-3 grades-table min-w-[1000px]">
              <h2 className="col-span-3">Name</h2>
              <h2 className="col-span-2">Points</h2>
              <h2 className="col-span-3">Category</h2>
              <h2 className="col-span-2">Percentage</h2>
              <span className="hidden sm:block"></span>
              {currentGrades.map((grade, index) => {
                const percentage = grade.pointsEarned / grade.pointsOutOf;
                return (
                  <Fragment key={index}>
                    <input
                      name={`name-${index}`}
                      defaultValue={grade.name}
                      className="col-span-3 grades-item"
                    />
                    <div className="flex rounded-xl bg-white col-span-2 font-semibold">
                      <input
                        name={`pointsEarned-${index}`}
                        className="w-[45%] rounded-xl py-2 px-3 text-center"
                        value={
                          grade.pointsEarned === 0 ? "" : grade.pointsEarned
                        }
                        onChange={(e) => updatePointsEarned(e, index)}
                      />
                      <span className="py-2 px-3 rounded-xl mx-2 text-slate-500 font-light">
                        /
                      </span>
                      <input
                        name={`pointsOutOf-${index}`}
                        className="w-[45%] py-2 px-3 rounded-xl text-center"
                        value={grade.pointsOutOf === 0 ? "" : grade.pointsOutOf}
                        onChange={(e) => updatePointsOutOf(e, index)}
                      />
                    </div>
                    <GradeCategory
                      index={index}
                      categories={categories}
                      category={grade.category ?? undefined}
                      updateCategory={updateCategory}
                    />
                    <p className="grades-item col-span-2 font-semibold relative">
                      {/* START OF PERCENTAGE */}
                      {isNaN(percentage) ? (
                        "N/A"
                      ) : (
                        <>
                          {percentage.toLocaleString("en-US", {
                            style: "percent",
                          })}
                          <span className="mx-2 text-slate-500 font-light">
                            -
                          </span>

                          {determineLetterGrade(percentage).letter}
                        </>
                      )}

                      {/* END OF PERCENTAGE */}
                      <div className="sm:hidden absolute right-0 flex items-center justify-center bg-slate-400 rounded-xl text-white">
                        <PlusCircleIcon
                          onClick={() => addSubtractButton(index, "Add")}
                          className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
                        />

                        <MinusCircleIcon
                          onClick={() => addSubtractButton(index, "Subtract")}
                          className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
                        />
                      </div>
                    </p>

                    <div className="hidden right-0 sm:flex items-center justify-center bg-slate-400 rounded-xl text-white">
                      <PlusCircleIcon
                        onClick={() => addSubtractButton(index, "Add")}
                        className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
                      />

                      <MinusCircleIcon
                        onClick={() => addSubtractButton(index, "Subtract")}
                        className="mx-1 h-7 w-7 rounded-full hover:bg-slate-500"
                      />
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          {/* END OF TABLE */}

          <button
            type="submit"
            disabled={!isDirty}
            className={`absolute top-2 right-2 sm:top-8 sm:right-8 px-4 py-2 bg-white shadow rounded-xl ${
              !isDirty ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-200"
            }`}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
