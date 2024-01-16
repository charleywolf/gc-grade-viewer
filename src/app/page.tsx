"use client";

import { Grade, GradeScale } from "@/lib/interfaces";
import { useEffect, useState } from "react";

import Scale513 from "@/lib/gradingScales/513/513";
import { determineLetterGrade } from "@/lib/helpers";

export default function Home() {
  const [rawGrades, setRawGrades] = useState<string>("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [gradingScale, setGradingScale] = useState<GradeScale>("pts");

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

    if (gradingScale === "pts") {
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
    } else if (gradingScale === "513") {
      setAverage(Scale513(grades));
    }
  }, [grades, gradingScale]);

  return (
    <div className="container mx-auto mt-10 p-4">
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

      <select
        className="mt-5 w-full custom-select block p-2 rounded-md border border-gray-300"
        onChange={(e) => setGradingScale(e.target.value as GradeScale)}
      >
        <option value="pts">Points Grading System</option>
        <option value="513">Freshman Biology 513</option>
      </select>

      <textarea
        className="w-full mt-5 h-40 p-2 border border-gray-300 rounded-md resize-none"
        placeholder="Paste grades from Google Classroom here..."
        value={rawGrades}
        onChange={(e) => setRawGrades(e.target.value)}
      ></textarea>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleSubmit}
      >
        Calculate Average
      </button>
    </div>
  );
}
