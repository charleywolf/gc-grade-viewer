import { Category, Grade } from "../types";

type CategoryCalc = {
  weight: number;
  pointsEarned: number;
  pointsOutOf: number;
};

export default function customGrade(
  grades: Grade[],
  categories: Category[]
): number {
  // Calculate the total points earned and total points possible for each category
  const calculation: { [key: string]: CategoryCalc } = {};

  categories.forEach((category) => {
    calculation[category.name] = {
      weight: category.weight,
      pointsEarned: 0, // Default value, adjust as needed
      pointsOutOf: 0, // Default value, adjust as needed
    };
  });

  grades.forEach((grade) => {
    if (grade.category) {
      calculation[grade.category].pointsEarned += grade.pointsEarned;
      calculation[grade.category].pointsOutOf += grade.pointsOutOf;
    }
  });

  let total = 0;

  for (const key in calculation) {
    const { weight, pointsEarned, pointsOutOf } = calculation[key];
    const totalPercent = pointsEarned / pointsOutOf;

    if (!isNaN(totalPercent)) {
      total += totalPercent * (weight / 100);
    } else {
      total += weight / 100;
    }
  }

  return total;
}
