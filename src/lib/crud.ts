import { Category, ClassGrades_Type, Grade, gradeConverter } from "./types";
import { WriteResult, getFirestore } from "firebase-admin/firestore";

import { firebase_app } from "./config";

const db = getFirestore(firebase_app);

export async function getGrades(
  email: string
): Promise<ClassGrades_Type | undefined> {
  const doc = await db
    .collection("grades")
    .doc(email)
    .withConverter(gradeConverter)
    .get();

  if (doc.data()) {
    return doc.data();
  } else {
    const newDoc = await db
      .collection("grades")
      .doc(email)
      .withConverter(gradeConverter)
      .set({ name: "", categories: [], grades: [] });
  }
}

export async function updateSettings(
  email: string,
  name: string,
  categories: Category[]
): Promise<WriteResult> {
  const doc = db.collection("grades").doc(email).withConverter(gradeConverter);

  const edit = await doc.update({
    name: name,
    categories: categories,
  });

  const grades = (await doc.get()).data();

  if (grades) {
    // Verify that every grade has a category that matches the new categories
    let newGrades = grades.grades;

    let changed = false;
    newGrades.forEach((grade, index) => {
      if (!categories.some((category) => category.name === grade.category)) {
        newGrades[index].category = null;
        changed = true;
      }
    });

    if (changed) {
      await doc.update({
        grades: newGrades,
      });
    }
  }
  return edit;
}

export async function updateGrades(
  email: string,
  grades: Grade[]
): Promise<WriteResult> {
  const doc = await db
    .collection("grades")
    .doc(email)
    .withConverter(gradeConverter)
    .update({
      grades: grades,
    });

  return doc;
}
