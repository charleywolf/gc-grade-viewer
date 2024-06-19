import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import Grades from "./grades/Grades";
import Image from "next/image";
import Loading from "./loading";
import Settings from "./settings/Settings";
import { getGrades } from "@/lib/crud";
import { redirect } from "next/navigation";

export default withPageAuthRequired(
  async function ProtectedPage() {
    const user = await getSession();
    const status = "Free Tier";

    if (!user) return <Loading />;

    const grades = await getGrades(user.user.email);

    if (!grades) {
      redirect("/premium");
    }

    return (
      <div className="outer-div">
        {/* User Banner */}
        <div className="banner mb-8">
          <div className="user-banner">
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
        <div className="banner relative">
          <Settings categories={grades.categories} name={grades.name} />
        </div>
      </div>
    );
  },
  { returnTo: "/premium" }
);
