"use client";

import { useEffect, useState } from "react";

import { Category } from "@/lib/types";
import CategoryList from "./CategoryList";
import { saveSettings } from "../Actions";
import { useFormState } from "react-dom";

export default function Settings({
  categories,
  name,
}: {
  name: string;
  categories: Category[];
}) {
  const [state, formAction] = useFormState(saveSettings, null);
  const [isDirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = true;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  useEffect(() => {
    if (state && state.message) {
      setDirty(false);
      window.onbeforeunload = null;
      location.reload();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col justify-center items-center"
    >
      <h2 className="text-2xl font-semibold mb-10">Settings</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-24 lg:gap-32">
        <div className="settings-div">
          <label className="settings-label">Class Name:</label>
          <input
            name="name"
            className="settings-input"
            defaultValue={name}
            placeholder="Math"
            onChange={() => setDirty(true)}
          />
        </div>
        <div className="settings-div">
          <label className="settings-label">Categories:</label>
          <CategoryList defaultCategories={categories} setDirty={setDirty} />
        </div>
      </div>
      <button
        type="submit"
        disabled={!isDirty}
        className={`absolute top-2 right-2 sm:top-8 sm:right-8 px-4 py-2 bg-white shadow rounded-xl ${
          !isDirty ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-200"
        }`}
      >
        Save
      </button>
    </form>
  );
}
