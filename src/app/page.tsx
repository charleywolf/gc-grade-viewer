"use client";

import { Grade, GradeSystem } from "@/lib/interfaces";
import { classNames, determineLetterGrade } from "@/lib/helpers";
import { useEffect, useState } from "react";

import Final from "@/components/Final";
import LabelWithInfo from "@/components/LabelWithInfo";
import System513 from "@/lib/gradingSystems/513/513";

export default function Home() {
  const [rawGrades, setRawGrades] = useState<string>("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [gradingSystem, setGradingSystem] = useState<GradeSystem | null>(null);

  const handleSubmit = () => {
    const regex = /(\b\d+(\.\d+)?\b) points out of possible (\b\d+\b)/g;
    const matches: Grade[] = [];

    let match;
    while ((match = regex.exec(rawGrades)) !== null) {
      const x: number = Number(match[1]);
      const y: number = Number(match[3]);
      matches.push({ earned: x, possible: y });
    }

    setGrades(matches);
  };

  useEffect(() => {
    if (grades.length === 0) return;

    if (gradingSystem === "pts") {
      let total: Grade = {
        earned: 0,
        possible: 0,
      };

      for (const grade of grades) {
        total.earned += grade.earned;
        total.possible += grade.possible;
      }

      console.log(grades);

      setAverage(total.earned / total.possible);
    } else if (gradingSystem === "513") {
      setAverage(System513(grades));
    }
  }, [grades, gradingSystem]);

  return (
    <div className="container mx-auto mt-1 lg:mt-5 sm:mt-2 xl:mt-10 p-4">
      <div className="sm:flex sm:justify-between items-center mb-5">
        <div>
          <header className="text-2xl lg:text-4xl font-bold">
            Google Classroom Grade Calculator
          </header>
          <h2 className="text-sm md:text-lg">
            Created for Scarsdale High School by Charley Wolf
          </h2>
        </div>

        {average !== null && (
          <div className="mt-5 sm:mt-0 flex p-2 flex-col items-center bg-blue-500 text-white rounded-xl">
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

      <div className="w-full mt-5">
        <LabelWithInfo href="/help/systems" title="Grading System" />
        <select
          className="w-full custom-select block p-2 rounded-md border border-gray-300"
          onChange={(e) => setGradingSystem(e.target.value as GradeSystem)}
          defaultValue={-1}
        >
          <option disabled value={-1}>
            Choose a grading system
          </option>
          <option value="pts">Total Points</option>
          <option value="513">Biology 513</option>
        </select>
      </div>

      <div className="w-full mt-5">
        <LabelWithInfo href="/help/grades" title="Classroom Grades" />
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
          placeholder="Paste raw grades from Google Classroom here..."
          value={rawGrades}
          onChange={(e) => setRawGrades(e.target.value)}
        />
      </div>

      <button
        className={classNames(
          "mt-4 font-semibold text-white px-4 py-2 rounded-md bg-blue-500",
          gradingSystem && rawGrades !== ""
            ? ""
            : "opacity-50 cursor-not-allowed"
        )}
        onClick={handleSubmit}
      >
        Calculate Average
      </button>

      <hr className="h-px my-12 bg-gray-200 border-0 dark:bg-gray-300" />

      <Final average={average} />
    </div>
  );
}
