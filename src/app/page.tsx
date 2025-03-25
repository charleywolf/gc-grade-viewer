"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Grade, GradeSystem } from "@/lib/interfaces";
import { classNames, determineLetterGrade } from "@/lib/helpers";
import customGrade, { CategoryCalc } from "@/lib/gradingSystems/custom";

import { Category } from "@/lib/types";
import CategoryList from "./premium/settings/CategoryList";
import Final from "@/components/Final";
import { IconH1 } from "@tabler/icons-react";
import LabelWithInfo from "@/components/LabelWithInfo";
import { Select } from "@headlessui/react";
import System513 from "@/lib/gradingSystems/513/513";
import clsx from "clsx";

export default function Home() {
  const [rawGrades, setRawGrades] = useState<string>("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [gradingSystem, setGradingSystem] = useState<GradeSystem | null>(null);
  const [currentCategories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (grades.length === 0) return;

    if (gradingSystem === "pts") {
      let total: Grade = {
        earned: 0,
        possible: 0,
        name: "Total",
      };

      for (const grade of grades) {
        total.earned += grade.earned;
        total.possible += grade.possible;
      }

      setAverage(total.earned / total.possible);
    } else if (gradingSystem === "513") {
      setAverage(System513(grades));
    } else if (gradingSystem === "custom") {
      console.log("Categories and Grades:", currentCategories, grades);
      const calculation: { [key: string]: CategoryCalc } = {};

      currentCategories.forEach((category) => {
        calculation[category.name] = {
          weight: category.weight,
          pointsEarned: 0,
          pointsOutOf: 0,
        };
      });

      grades.forEach((grade) => {
        if (grade.category) {
          calculation[grade.category].pointsEarned += grade.earned;
          calculation[grade.category].pointsOutOf += grade.possible;
        }
      });

      let total = 0;

      for (const key in calculation) {
        const { weight, pointsEarned, pointsOutOf } = calculation[key];
        const totalPercent = pointsOutOf > 0 ? pointsEarned / pointsOutOf : 0;

        console.log(
          `Category: ${key}, Earned: ${pointsEarned}, Possible: ${pointsOutOf}, Percent: ${totalPercent}, Weight: ${weight}`
        );

        if (!isNaN(totalPercent)) {
          total += totalPercent * (weight / 100);
        } else {
          total += weight / 100;
        }
      }

      console.log("Calculated Total Average:", total);
      setAverage(total);
    }
  }, [grades, gradingSystem, currentCategories]);

  const removeUnwantedLines = (inputText: string) => {
    // Split the text into individual lines
    const lines = inputText.split("\n");

    // Filter out lines matching any of the given criteria
    const filteredLines = lines.filter((line) => {
      const trimmed = line.trim();

      // Remove if line is empty or only 1 character long
      if (trimmed === "" || trimmed.length === 1) return false;

      // Remove if the line exactly matches "No due date" or "Done late"
      if (trimmed === "No due date" || trimmed === "Done late") return false;

      // Remove if the line starts with "Due"
      if (trimmed.startsWith("Due")) return false;

      // Remove if the line ends with "submission attachment" or "private comment"
      if (
        trimmed.endsWith("submission attachment") ||
        trimmed.endsWith("private comment")
      )
        return false;

      // Otherwise, keep the line
      return true;
    });

    // Join the filtered lines back together
    return filteredLines.join("\n");
  };

  const removeExcess = () => {
    const cleanedText = removeUnwantedLines(rawGrades);
    // Regex explanation:
    // (.+)\n            → Capture any characters (assignment title) followed by a newline.
    // \b(\d+(?:\.\d+)?)  → Capture the earned points (integer or decimal) as group 3.
    //  points out of possible
    // (\d+)\b           → Capture the total points as group 4.
    const regex = /(.+)\n\b(\d+(?:\.\d+)?) points out of possible (\d+)\b/g;

    const replaced = cleanedText.match(regex);

    if (replaced) {
      setRawGrades(replaced.join("\n\n"));
      const grades = replaced.map((line) => {
        const [name, points] = line.split("\n");
        const [earned, possible] = points.split(" points out of possible ");

        return {
          name: name,
          earned: parseFloat(earned),
          possible: parseFloat(possible),
        };
      });
      setGrades(grades);
    }
  };

  const updateCategory = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const cat = e.target.value;

    const newGrades = grades.map((grade, idx) => {
      if (idx === index) {
        return {
          ...grade,
          category: cat,
        };
      }
      return grade;
    });

    setGrades(newGrades);
  };

  return (
    <div className="container mx-auto mt-1 lg:mt-5 sm:mt-2 xl:mt-10 p-4">
      {/* <Notice /> */}
      <div className="sm:flex sm:justify-between items-center mb-8">
        <div className="w-full sm:w-max theme-section p-4">
          <h1 className="text-center text-2xl sm:text-left mb-1 sm:text-4xl font-bold">
            Grade Viewer
          </h1>
          <h2 className="text-center text-sm sm:text-left sm:text-lg">
            Created for Google Classroom at Scarsdale High School by Charley
            Wolf
          </h2>
        </div>

        {average !== null && (
          <div className="mt-5 sm:mt-0 flex flex-col items-center theme-section rounded-xl">
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
        )}
      </div>

      <section className="w-full theme-section mb-8">
        <div className="w-full mt-5">
          <LabelWithInfo
            href="/help/systems"
            title="Grading System"
            aria-label="Grading System"
          />
          <Select
            className="select"
            onChange={(e) => setGradingSystem(e.target.value as GradeSystem)}
            defaultValue={-1}
          >
            <option disabled value={-1}>
              Choose a grading system
            </option>
            <option value="custom">NEW - Custom</option>
            <option value="pts">Total Points</option>
            <option value="513">Biology 513</option>
          </Select>
        </div>

        <div className="w-full mt-5">
          <LabelWithInfo href="/help/grades" title="Classroom Grades" />
          <textarea
            className={clsx(
              "w-full h-40 p-2 text-black bg-white rounded-md resize-none theme-input"
            )}
            placeholder="Paste raw grades from Google Classroom here..."
            value={rawGrades}
            onChange={(e) => setRawGrades(e.target.value)}
            onBlur={removeExcess}
          />
        </div>

        {gradingSystem == "custom" && (
          <div className="w-full mt-5 flex flex-col text-black">
            <div id="modal-container"></div>
            <label className="flex text-gray-100 font-bold mb-2">
              Categories
            </label>
            <CategoryList
              currentCategoriesA={currentCategories}
              setCategoriesA={setCategories}
            />
          </div>
        )}

        <div className="w-full mt-5 flex flex-col">
          <label className="flex text-gray-100 font-bold mb-2">
            {grades.length > 0 && "Grades"}
          </label>
          {grades.map((grade, index) => (
            <div
              key={index}
              className="grid grid-cols-5 w-full text-black gap-6 py-2"
            >
              <div className="px-3 py-3 col-span-3 bg-white rounded-xl overflow-x-auto whitespace-nowrap">
                {grade.name}
              </div>
              <div className="flex gap-2 col-span-1 justify-end h-full items-stretch">
                <div className="px-3 py-2 w-full bg-white rounded-xl h-full">
                  {grade.earned}
                </div>
                <div className="px-3 py-2 w-full bg-white rounded-xl h-full">
                  {grade.possible}
                </div>
              </div>
              {gradingSystem === "custom" && (
                <Select
                  className="col-span-1 py-2 px-3 theme-input flex rounded-xl bg-white appearance-none"
                  name={`category-${index}`}
                  onChange={(e) => updateCategory(e, index)}
                  defaultValue={-1}
                >
                  {currentCategories.map((cat) => (
                    <option key={cat.name + cat.weight} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  <option value={-1}>--- Select a category ---</option>
                </Select>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="theme-section">
        <Final average={average} />
      </section>
    </div>
  );
}
