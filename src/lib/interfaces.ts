export interface Grade {
  earned: number;
  possible: number;
}

export interface LetterGrade {
  letter: string;
  percent: number;
}

export type GradeSystem = "pts" | "513";
