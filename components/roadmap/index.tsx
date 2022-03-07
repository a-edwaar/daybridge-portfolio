import { useEffect, useMemo, useRef, useState } from "react";
import { Roadmap as RoadmapProps } from "@/types/roadmap";
import Card from "./card";
import Sidebar from "./sidebar";
import Header from "../header";
import { debounce } from "lodash";

export default function Roadmap({
  categories,
  tags,
  cards,
  months,
  years,
  initialYear,
  introHtml,
}: RoadmapProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCategories, setFilteredCategories] = useState<boolean[]>(
    new Array(categories.length).fill(true)
  );
  const [roadmapYear, setRoadmapYear] = useState<number>(years.length - 1);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const currentDate = useMemo<Date>(() => {
    return new Date();
  }, []);
  const numberOfMonths = useMemo<number>(() => {
    return (
      currentDate.getMonth() + (currentDate.getFullYear() - initialYear) * 12
    );
  }, [currentDate, initialYear]);

  /* Scroll so the current month is visible */
  useEffect(() => {
    setLoading(true);
    if (scrollContainer.current) {
      const columnWidth = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--roadmap-column-width")
          .replace("px", "")
      );
      const offset = columnWidth / 4;
      scrollContainer.current.scrollLeft =
        (numberOfMonths - 2) * columnWidth - offset;
    }
    setLoading(false);
  }, [numberOfMonths]);

  /* Update the year shown in the header on scroll */
  const onScroll = () => {
    if (scrollContainer.current) {
      const columnWidth = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--roadmap-column-width")
          .replace("px", "")
      );
      const offset = columnWidth / 4;
      const expectedYear = Math.floor(
        (scrollContainer.current.scrollLeft + offset) / columnWidth / 12
      );
      setRoadmapYear(expectedYear);
    }
  };
  const debounceScroll = useMemo(() => debounce(onScroll, 100), []);

  return (
    <>
      <Header
        years={years}
        scrollRef={scrollContainer}
        roadmapYear={roadmapYear}
        introHtml={introHtml}
      />

      <main className="flex flex-col flex-grow">
        <div className="flex-grow grid grid-cols-5 divide-x divide-slate-200">
          <Sidebar
            categories={categories}
            filteredCategories={filteredCategories}
            setFilteredCategories={setFilteredCategories}
          />

          <div
            onScroll={debounceScroll}
            ref={scrollContainer}
            className="col-span-full lg:col-span-4 relative flex flex-col overflow-auto bg-slate-50"
          >
            {/* Months bar */}
            <div className="sticky top-0 z-10 grid grid-flow-col auto-cols-roadmap divide-x divide-slate-200 text-sm">
              {months.map((month, index) => (
                <div key={index} className="relative">
                  <div className="flex space-x-2 py-2 px-4 font-medium text-slate-500 bg-white backdrop-blur-sm bg-opacity-60 border-b border-slate-200">
                    {index % 12 === 0 && (
                      <span className="font-semibold">
                        {currentDate.getFullYear() -
                          (currentDate.getFullYear() -
                            initialYear -
                            index / 12)}
                      </span>
                    )}
                    <span>{month}</span>
                  </div>
                  {numberOfMonths === index && (
                    <div className="absolute inset-0 top-[34px] bg-daybridge rounded-lg"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex-auto relative flex flex-col">
              {/* Columns background */}
              <div className="flex-auto grid grid-flow-col auto-cols-roadmap divide-x divide-slate-200">
                {months.map((_month, index) => (
                  <div key={index}></div>
                ))}
              </div>

              {/* Cards overlay */}
              {!loading && (
                <div
                  id="cards"
                  className="absolute left-0 right-0 grid grid-flow-col auto-cols-roadmap auto-rows-roadmap divide-x divide-transparent gap-y-2 py-2"
                >
                  {cards
                    .filter((card) =>
                      filteredCategories[card.category] ? true : false
                    )
                    .map((card) => (
                      <Card
                        key={card.title}
                        card={card}
                        tag={tags[card.tag]}
                        initialYear={initialYear}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
