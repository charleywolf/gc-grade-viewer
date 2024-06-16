import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Grades from "./grades/Grades";
import Image from "next/image";
import Settings from "./settings/Settings";
import { getGrades } from "@/lib/crud";
import { redirect } from "next/navigation";

export default withPageAuthRequired(
  async function ProtectedPage() {
    const user = await getSession();
    const status = "Free Tier";

    if (!user) return <></>;

    const grades = await getGrades(user.user.email);

    if (!grades) {
      redirect("/premium");
    }

    return (
      <div className="mx-auto mt-1 lg:mt-5 sm:mt-2 xl:mt-10">
        {/* User Banner */}
        <div className="w-screen bg-slate-100 p-10 mb-16">
          <div className="flex flex-col text-center sm:flex-row sm:text-left items-center justify-center">
            <Image
              className="h-32 w-32 rounded-full sm:mr-10 mb-5 sm:mb-0"
              src={user.user.picture}
              height={402}
              width={402}
              alt={user.user.nickname}
            />
            <div>
              <div className="flex flex-col mb-5">
                <span className="font-bold">Current Account:</span>
                <span>{user.user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Membership:</span>
                <span>{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grades */}

        <Grades
          className={grades.name}
          grades={grades.grades}
          categories={grades.categories}
        />

        {/* Settings */}
        <div className="w-screen relative bg-slate-100 p-5 sm:p-10">
          <Settings categories={grades.categories} name={grades.name} />
        </div>
      </div>
    );
  },
  { returnTo: "/premium" }
);
