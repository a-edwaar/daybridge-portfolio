import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { RefObject, useState } from "react";
import Intro from "./intro";

interface HeaderProps {
  years: number[];
  scrollRef: RefObject<HTMLDivElement>;
  roadmapYear: number;
  introHtml: string;
}

export default function Header({
  years,
  scrollRef,
  roadmapYear,
  introHtml,
}: HeaderProps) {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const scrollToYear = (yearIndex: number) => {
    if (scrollRef.current) {
      const columnWidth = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--roadmap-column-width")
          .replace("px", "")
      );
      const offset = columnWidth / 4;
      scrollRef.current.scroll({
        left: yearIndex * 12 * columnWidth - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="grid grid-cols-3 p-4 border-b border-slate-200">
      <div className="flex items-center space-x-3 lg:space-x-6">
        <button
          onClick={() => scrollToYear(roadmapYear - 1)}
          disabled={roadmapYear === 0}
          className="transition-all duration-150 ease-in-out hover:scale-105 disabled:hover:scale-100 disabled:text-slate-300"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="font-semibold">{years[roadmapYear]}</span>
        <button
          onClick={() => scrollToYear(roadmapYear + 1)}
          disabled={roadmapYear === years.length - 1}
          className="transition-all duration-150 ease-in-out hover:scale-105 disabled:hover:scale-100 disabled:text-slate-300"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <h1 className="flex justify-self-center items-center space-x-1">
        <span className="font-semibold">Web Engineer Role</span>
        <span className="hidden md:inline-block font-medium text-slate-500">
          /
        </span>
        <span className="hidden md:inline-block font-medium text-slate-500">
          Daybridge
        </span>
      </h1>
      <div className="col-start-3 justify-self-end flex items-center space-x-6">
        <a
          target="_blank"
          href="mailto://archie@hey.com?subject=Daybridge Application"
          className="hidden md:flex items-center py-[6px] px-3 text-white bg-daybridge rounded-md transition-all ease-in-out duration-150 hover:bg-opacity-90"
          rel="noreferrer"
        >
          <MailIcon className="w-5 h-5" />
          <span className="ml-2 text-sm font-medium">Contact</span>
        </a>
        <button
          onClick={() => setShowIntro(true)}
          className="flex items-center"
        >
          <span className="hidden md:inline-block font-medium">Archie</span>
          <div className="ml-2 w-8 h-8 relative">
            <Image
              src="/avatar.png"
              alt="Picture of Archie Edwards"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </button>
      </div>

      <Intro
        contentHtml={introHtml}
        isOpen={showIntro}
        setIsOpen={setShowIntro}
      />
    </header>
  );
}
