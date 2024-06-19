"use client";

import { Grade, GradeSystem } from "@/lib/interfaces";
import { classNames, determineLetterGrade } from "@/lib/helpers";
import { useEffect, useState } from "react";

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

      setAverage(total.earned / total.possible);
    } else if (gradingSystem === "513") {
      setAverage(System513(grades));
    }
  }, [grades, gradingSystem]);

  const removeExcess = () => {
    const regex = /(\b\d+(\.\d+)?\b) points out of possible (\b\d+\b)/g;
    const parsed = rawGrades.match(regex);
    if (parsed) {
      setRawGrades(parsed.join("\n"));
    }
  };

  return (
    <div className="container mx-auto mt-1 lg:mt-5 sm:mt-2 xl:mt-10 p-4">
      {/* <Notice /> */}
      <div className="sm:flex sm:justify-between items-center mb-8">
        <div className="w-full sm:w-max theme-section p-4">
          <h1 className="text-center text-2xl sm:text-left mb-1 sm:text-4xl font-bold">
            Charley Wolf&apos;s Grade Viewer
          </h1>
          <h2 className="text-center text-sm sm:text-left sm:text-lg">
            Created for Google Classroom at Scarsdale High School
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

        <button
          className={classNames(
            "mt-4 font-semibold text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700",
            gradingSystem && rawGrades !== ""
              ? ""
              : "opacity-50 cursor-not-allowed"
          )}
          onClick={handleSubmit}
        >
          Calculate Average
        </button>
      </section>

      <section className="theme-section">
        <Final average={average} />
      </section>
    </div>
  );
}
