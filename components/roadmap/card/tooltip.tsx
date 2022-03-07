import { Card, Tag } from "@/types/roadmap";
import { forwardRef, useMemo } from "react";
import {
  format,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from "date-fns";
import { ChevronRightIcon } from "@heroicons/react/outline";

interface TooltipProps {
  card: Card;
  tag: Tag;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ card, tag }, ref) => {
    const startDate = useMemo<Date>(() => {
      return new Date(card.startDate);
    }, [card]);
    const endDate = useMemo<Date | null>(() => {
      return card.endDate ? new Date(card.endDate) : null;
    }, [card]);

    return (
      <div
        ref={ref}
        id="tooltip"
        role="tooltip"
        style={{
          display: "none",
          backgroundImage: `linear-gradient(to right, ${tag.fromColor}, ${tag.toColor})`,
        }}
        className="z-10 absolute w-80 rounded-md border border-slate-200 shadow-lg overflow-hidden"
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.7), rgb(255 255 255) 40%)",
          }}
          className="pt-20 px-4 pb-4 overflow-hidden"
        >
          <h3 className="font-bold truncate">{card.title}</h3>

          <div className="mt-[1px] flex items-center space-x-1 font-medium text-xs">
            <span>{format(startDate, "MMMM yyyy")}</span>
            <ChevronRightIcon className="w-3 h-3 text-slate-500" />
            {endDate ? (
              <span>{format(endDate, "MMMM yyyy")}</span>
            ) : (
              <span>Present</span>
            )}
            <span className="text-slate-500">
              (
              {endDate
                ? formatDistanceStrict(startDate, endDate, {
                    unit: "month",
                  })
                : formatDistanceToNowStrict(startDate, {
                    unit: "month",
                  })}
              )
            </span>
          </div>

          <div className="mt-2 flex space-x-2">
            <div
              style={{ backgroundColor: `${tag.fromColor}20` }}
              className="font-medium text-[10px] max-w-max py-[2px] px-2 rounded-md"
            >
              <span>{tag.name}</span>
            </div>
            {card.secondaryTag && (
              <div className="font-medium text-[10px] bg-slate-200 max-w-max py-[2px] px-2 rounded-md">
                <span>{card.secondaryTag}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
