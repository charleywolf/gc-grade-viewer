"use client";

import { Grade, GradeSystem } from "@/lib/interfaces";
import { useEffect, useState } from "react";

import LabelWithInfo from "@/Components/LabelWithInfo";
import System513 from "@/lib/gradingSystems/513/513";
import { determineLetterGrade } from "@/lib/helpers";

export default function Home() {
  const [rawGrades, setRawGrades] = useState<string>("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [gradingSystem, setGradingSystem] = useState<GradeSystem>("pts");

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
    <div className="container mx-auto mt-10 p-4">
      <div className="mb-5">
        <header className="text-4xl font-bold">
          Google Classroom Grade Calculator
        </header>
        <h2 className="text-xl">Optimized for Scarsdale High School Classes</h2>
      </div>

      {average !== null && (
        <>
          <h1 className="text-4xl font-black">
            {determineLetterGrade(average)}
          </h1>
          <h2 className="text-2xl font-bold">
            {average.toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
            })}
          </h2>
        </>
      )}

      <div className="w-full mt-5">
        <LabelWithInfo href="/help/systems" title="Grading System" />
        <select
          className="w-full custom-select block p-2 rounded-md border border-gray-300"
          onChange={(e) => setGradingSystem(e.target.value as GradeSystem)}
        >
          <option value="pts">Total Points</option>
          <option value="513">Freshman Biology 513</option>
        </select>
      </div>

      <div className="mt-5 w-full">
        <LabelWithInfo href="/help/grades" title="Classroom Grades" />
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none"
          placeholder="Paste raw grades from Google Classroom here..."
          value={rawGrades}
          onChange={(e) => setRawGrades(e.target.value)}
        ></textarea>
      </div>

      <button
        className="mt-4 bg-blue-500 font-semibold text-white px-4 py-2 rounded-md"
        onClick={handleSubmit}
      >
        Calculate Average
      </button>
    </div>
  );
}
