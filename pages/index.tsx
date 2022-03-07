import Head from "next/head";
import roadmapJSON from "@/data/roadmap.json";
import { Roadmap as HomeProps } from "@/types/roadmap";
import Roadmap from "@/components/roadmap";
import { GetStaticPropsResult } from "next";
import { getPostData } from "@/lib/get-posts";

const Home = (props: HomeProps) => {
  return (
    <div className="min-h-screen flex flex-col text-slate-800 antialiased">
      <Head>
        <title>Archie Edwards - Daybridge Web Engineer</title>
        <meta
          name="description"
          content="You're new web engineer at Daybridge!"
        />
      </Head>

      <Roadmap {...props} />
    </div>
  );
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  // read data from json
  const { categories, tags, cards } = roadmapJSON;

  // calculate amount of months for roadmap
  const availableMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();
  let startDate = new Date();
  cards.map((card) => {
    const cardStartDate = new Date(card.startDate);
    if (cardStartDate < startDate) {
      startDate = cardStartDate;
    }
  });
  const initialYear = startDate.getFullYear();
  let months = availableMonths.slice();
  let years: number[] = [initialYear];
  for (let i = 0; i < currentYear - initialYear; i++) {
    years = [...years, initialYear + 1 + i];
    months = months.concat(availableMonths);
  }

  // render intro post
  const { contentHtml: introHtml } = await getPostData("intro");

  return {
    props: {
      categories,
      tags,
      cards,
      months,
      years,
      initialYear,
      introHtml,
    },
  };
};

export default Home;
