import { Grade } from "@/lib/interfaces";

export default function Scale513(grades: Grade[]): number {
  let testGrade: Grade = {
    earned: 0,
    possible: 0,
  };

  let labGrade: Grade = {
    earned: 0,
    possible: 0,
  };

  for (const grade of grades) {
    if (grade.possible > 50) {
      testGrade.earned += grade.earned;
      testGrade.possible += grade.possible;
    } else {
      labGrade.earned += grade.earned;
      labGrade.possible += grade.possible;
    }
  }

  let testAverage: number = testGrade.earned / testGrade.possible;
  let labAverage: number = labGrade.earned / labGrade.possible;
  return testAverage * 0.8 + labAverage * 0.2;
}
