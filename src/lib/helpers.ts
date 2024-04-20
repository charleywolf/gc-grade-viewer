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

export const gradingScale: LetterGrade[] = [
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

export function determineLetterGrade(average: number): LetterGrade {
  const roundedAverage = Math.round(average * 100);

  for (const grade of gradingScale) {
    if (roundedAverage >= grade.percent) {
      return grade;
    }
  }

  return { letter: "F", percent: 0 };
}

export function determineNextLetterGrade(
  currentGrade: LetterGrade
): LetterGrade | null {
  if (currentGrade.letter == "F") {
    gradingScale[11];
  }

  // Find the index of the currentGrade in the gradingScale array
  const currentIndex = gradingScale.findIndex(
    (grade) => grade.letter === currentGrade.letter
  );

  // If the currentGrade is not found or it's the first item, return null
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }

  return gradingScale[currentIndex - 1];
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function isInteger(str: string): boolean {
  return !isNaN(parseInt(str, 10));
}

export function roundToHundredth(num: number, percentage: boolean): number {
  let multiplier = percentage ? 100 : 1;
  return Math.round(num * 100 * multiplier) / 100 / multiplier;
}

export function calculateRequiredGrade(
  a: number,
  bu: number,
  cu: number
): number {
  // a = average in %
  // bu = whole number final worth
  // cu = whole number desired average

  let b = bu / 100;
  let c = (cu - 0.5) / 100;

  return roundToHundredth((a * b - a + c) / b, true);
}
