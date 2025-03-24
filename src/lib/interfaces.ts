export interface Grade {
  earned: number;
  possible: number;
  name: string;
  category?: string;
}

export interface LetterGrade {
  letter: string;
  percent: number;
}

export type GradeSystem = "pts" | "513" | "custom";
