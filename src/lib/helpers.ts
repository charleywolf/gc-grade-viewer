/*
A+	97%
A	93%
A-	90%
B+	87%
B	83%
B-	80%
C+	77%
C	73%
C-	70%
D+	67%
D	65%
F	0%
*/

import { LetterGrade } from "./interfaces";

const gradingScale: LetterGrade[] = [
  {
    letter: "A+",
    percent: 97,
  },
  {
    letter: "A",
    percent: 93,
  },
  {
    letter: "A-",
    percent: 90,
  },
  {
    letter: "B+",
    percent: 87,
  },
  {
    letter: "B",
    percent: 83,
  },
  {
    letter: "B-",
    percent: 80,
  },
  {
    letter: "C+",
    percent: 77,
  },
  {
    letter: "C",
    percent: 73,
  },
  {
    letter: "C-",
    percent: 70,
  },
  {
    letter: "D+",
    percent: 67,
  },
  {
    letter: "D",
    percent: 65,
  },
];

export function determineLetterGrade(average: number): string {
  const roundedAverage = Math.round(average * 100);

  for (const grade of gradingScale) {
    if (roundedAverage >= grade.percent) {
      return grade.letter;
    }
  }

  return "F";
}
