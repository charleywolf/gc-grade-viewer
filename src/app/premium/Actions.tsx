"use server";

import { Category, Grade } from "@/lib/types";
import { updateGrades, updateSettings } from "@/lib/crud";

import { getSession } from "@auth0/nextjs-auth0";

export async function saveSettings(_: unknown, formData: FormData) {
  const user = await getSession();
  let categories: Category[] = [];
  let index = 0;

  while (formData.get(`category-name-${index}`) !== null) {
    const name = formData.get(`category-name-${index}`);
    const weight = formData.get(`category-weight-${index}`);

    if (weight && name) {
      categories.push({
        name: name.toString(),
        weight: Number(weight),
      });
    }
    index++;
  }

  const name = formData.get("name")?.toString();

  if (name && categories && user && typeof user.user.email === "string") {
    const result = await updateSettings(user.user.email, name, categories);
    return { message: JSON.stringify(result.writeTime) };
  }
  return false;
}

export async function saveGrades(_: unknown, formData: FormData) {
  const user = await getSession();
  let grades: Grade[] = [];
  let index = 0;

  while (formData.get(`name-${index}`) !== null) {
    const name = formData.get(`name-${index}`);
    const pointsEarned = formData.get(`pointsEarned-${index}`);
    const pointsOutOf = formData.get(`pointsOutOf-${index}`);
    const category = formData.get(`category-${index}`);

    if (name && pointsEarned && pointsOutOf && category) {
      grades.push({
        name: name.toString(),
        pointsEarned: Number(pointsEarned),
        pointsOutOf: Number(pointsOutOf),
        category: category.toString(),
      });
    }
    index++;
  }

  if (grades && user && typeof user.user.email === "string") {
    const result = await updateGrades(user.user.email, grades);
    return { message: JSON.stringify(result.writeTime) };
  }
  return false;
}
