import {
  calculateRequiredGrade,
  determineLetterGrade,
  determineNextLetterGrade,
  gradingScale,
  isInteger,
  roundToHundredth,
} from "@/lib/helpers";
import { useEffect, useState } from "react";

import LabelWithInfo from "./LabelWithInfo";
import { LetterGrade } from "@/lib/interfaces";

export default function Final({ average }: { average: number | null }) {
  const [final, setFinal] = useState<number>(0);
  const [letterGrade, setLetterGrade] = useState<LetterGrade | null>(null);
  const [desired, setDesired] = useState<LetterGrade | null>(null);

  const handleFinal = (unparsedNumber: string) => {
    let num = Number(unparsedNumber);
    if (unparsedNumber == "") {
      final !== 0 && setFinal(0);
    } else if (isInteger(unparsedNumber) && num > 0 && num <= 100) {
      final !== num && setFinal(num);
    }
  };

  useEffect(() => {
    if (average) {
      setLetterGrade(determineLetterGrade(average));
    }
  }, [average]);

  let reqGrade: number | null =
    desired &&
    letterGrade &&
    average &&
    calculateRequiredGrade(average, final, desired.percent);

  return (
    <div>
      <header className="text-xl lg:text-2xl font-bold">Final Grade</header>

      <div className="w-full mt-5">
        <LabelWithInfo title="Percentage Worth of Final" />
        <div className="flex items-center">
          <input
            className="w-12 block p-2 rounded-md border border-gray-300"
            placeholder="100"
            value={final != 0 ? final.toString() : ""}
            onChange={(e) => handleFinal(e.target.value)}
          />
          <span className="text-lg ml-1">%</span>
        </div>
      </div>
      <div className="w-full mt-5">
        <LabelWithInfo title="Desired Grade" />

        <select
          className="w-full custom-select block p-2 rounded-md border border-gray-300"
          onChange={(e) => setDesired(gradingScale[Number(e.target.value)])}
          defaultValue={-1}
        >
          <option disabled value={-1}>
            Choose your desired grade
          </option>
          {gradingScale.map((grade, ind) => (
            <option key={grade.percent} value={ind}>
              {grade.letter}
            </option>
          ))}
        </select>

        {letterGrade && reqGrade && desired && average && (
          <div className="mt-5 italic">
            <span>
              You need a
              <span className="font-bold">
                {" "}
                {reqGrade.toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 2,
                })}{" "}
              </span>
              on the final in order to get a(n)
              <span className="font-bold"> {desired.letter}</span>!{" "}
              {reqGrade > 1 && "You're cooked."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
