import {
  autoPlacement,
  computePosition,
  offset,
  shift,
} from "@floating-ui/dom";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { monthDiff } from "@/lib/month-diff";
import { Card, Tag } from "@/types/roadmap";
import Tooltip from "./tooltip";

interface CardProps {
  card: Card;
  tag: Tag;
  initialYear: number;
}

export default function CardComponent({ card, tag, initialYear }: CardProps) {
  const [loading, setLoading] = useState(true);
  const [startColumn, setStartColumn] = useState(1);
  const [length, setLength] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  /*
  Calculate card positioning
  */
  useEffect(() => {
    setLoading(false);
    const startDate = new Date(card.startDate);
    const endDate = card.endDate ? new Date(card.endDate) : new Date();

    setStartColumn(
      startDate.getMonth() + 1 + 12 * (startDate.getFullYear() - initialYear)
    );
    setLength(monthDiff(startDate, endDate));
    setLoading(true);
  }, [card, initialYear, setStartColumn, setLength]);

  const showTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
      positionTooltip();
    }
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  /*
  Position tooltip so its automatically visible
  */
  const positionTooltip = () => {
    if (cardRef.current && tooltipRef.current) {
      computePosition(cardRef.current, tooltipRef.current, {
        middleware: [
          offset(8),
          shift({
            padding: 16,
          }),
          autoPlacement({
            alignment: "start",
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(tooltipRef.current!.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  };

  if (loading) {
    <div></div>;
  }

  return (
    <div
      style={{
        gridColumnStart: `${startColumn}`,
        gridColumnEnd: `span ${length}`,
      }}
      className="px-2 relative"
    >
      <Tooltip ref={tooltipRef} card={card} tag={tag} />

      <a href={card.url} target="_blank" rel="noreferrer">
        <article
          ref={cardRef}
          aria-describedby="tooltip"
          className="p-2 h-full bg-white rounded-md shadow-sm shadow-slate-200 border border-slate-200 cursor-pointer transition-all ease-in-out duration-300 hover:border-slate-300 hover:shadow-slate-300"
          onMouseOver={() => showTooltip()}
          onMouseLeave={() => hideTooltip()}
        >
          <div className="sticky left-2 max-w-max flex items-start">
            <div
              style={{
                backgroundImage: `linear-gradient(${tag.fromColor}, ${tag.toColor})`,
              }}
              className={`self-stretch w-1 rounded-md`}
            ></div>
            <div className="ml-3 min-w-0">
              <h3 className="font-semibold text-sm truncate">{card.title}</h3>
              <p className="mt-[2px] text-xs text-slate-500 truncate">
                {card.bio}
              </p>
            </div>
          </div>
        </article>
      </a>
    </div>
  );
}
