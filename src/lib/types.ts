import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export type Category = {
  weight: number;
  name: string;
};

export type Grade = {
  name: string;
  pointsEarned: number;
  pointsOutOf: number;
  category: string | null;
};

export type ClassGrades_Type = {
  name: string;
  categories: Category[];
  grades: Grade[];
};

class ClassGrades {
  name: string;
  categories: Category[];
  grades: Grade[];

  constructor(name: string, categories: Category[], grades: Grade[]) {
    this.name = name;
    this.categories = categories;
    this.grades = grades;
  }
}

export const gradeConverter = {
  toFirestore: (grades: ClassGrades_Type) => {
    return {
      name: grades.name,
      categories: grades.categories,
      grades: grades.grades,
    };
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    return new ClassGrades(data.name, data.categories, data.grades);
  },
};
