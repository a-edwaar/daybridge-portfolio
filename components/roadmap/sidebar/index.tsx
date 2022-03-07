import GithubIcon from "@/components/icons/github";
import TwitterIcon from "@/components/icons/twitter";
import { MailIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  categories: string[];
  filteredCategories: boolean[];
  setFilteredCategories: Dispatch<SetStateAction<boolean[]>>;
}

export default function Sidebar({
  categories,
  filteredCategories,
  setFilteredCategories,
}: SidebarProps) {
  const updateFilters = (categoryIndex: number) => {
    const updatedFilters = filteredCategories.map((checked, index) =>
      index === categoryIndex ? !checked : checked
    );
    setFilteredCategories(updatedFilters);
  };

  return (
    <div className="hidden lg:flex col-span-1 flex-col divide-y divide-slate-200 bg-white">
      <div className="flex-grow p-6">
        <h2 className="font-bold text-xl">Archie Edwards</h2>
        <div className="mt-8">
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Full Stack Developer</span>
              <span className="text-slate-500">22</span>
            </div>
            <span className="mt-2 font-medium text-sm text-slate-500">
              Birmingham, UK
            </span>
          </div>
          <div className="mt-6">
            <form>
              <ul className="space-y-4">
                {categories.map((category, index) => (
                  <li key={index}>
                    <label
                      htmlFor={category}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={category}
                        id={category}
                        value={category}
                        checked={filteredCategories[index]}
                        onChange={() => updateFilters(index)}
                      />
                      <span className="ml-2 font-medium text-sm">
                        {category}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col space-y-2 text-slate-500 font-medium text-sm">
        <a
          target="_blank"
          href="https://github.com/a-edwaar/daybridge-portfolio"
          className="flex items-center hover:text-slate-800"
          rel="noreferrer"
        >
          <GithubIcon />
          <span className="ml-2">/daybridge-portfolio</span>
        </a>
        <a
          target="_blank"
          href="https://twitter.com/archiethedev"
          className="flex items-center hover:text-slate-800"
          rel="noreferrer"
        >
          <TwitterIcon />
          <span className="ml-2">@archiethedev</span>
        </a>
        <a
          target="_blank"
          href="mailto:archie@hey.com?subject=Daybridge Application"
          className="flex items-center hover:text-slate-800"
          rel="noreferrer"
        >
          <MailIcon className="w-4 h-4" />
          <span className="ml-2">archie@hey.com</span>
        </a>
      </div>
    </div>
  );
}
