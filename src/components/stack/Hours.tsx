import { useEffect, useState } from "react";
import { hours } from "@/data/business";

export function Hours() {
  // Resolved after hydration so server and client markup match.
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  useEffect(() => setTodayIndex(new Date().getDay()), []);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-xl text-espresso">Opening Hours</h3>
      <ul className="mt-5 divide-y divide-border/70">
        {hours.map((entry, i) => {
          const isToday = todayIndex === i;
          return (
            <li
              key={entry.day}
              className="flex items-center justify-between gap-4 py-2.5 text-sm"
            >
              <span
                className={
                  isToday
                    ? "font-semibold text-espresso"
                    : "text-muted-foreground"
                }
              >
                {entry.day}
                {isToday && (
                  <span className="ml-2 rounded-full bg-mint px-2 py-0.5 text-[11px] font-medium text-mint-foreground">
                    Today
                  </span>
                )}
              </span>
              <span className={isToday ? "font-semibold text-espresso" : "text-espresso"}>
                {entry.hours}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
