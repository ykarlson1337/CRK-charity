// Adapted from 21st.dev "Scroll animated timeline" (ibrandify/scroll-timeline).
// Changes: one-sided layout and CRK tokens, the gold rule is drawn with a
// transform instead of height, scroll work is batched per frame, items
// activate when their dot passes the trigger line, and the server render is
// the finished state so the timeline reads fine without JavaScript or with
// reduced motion.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './history-timeline.css';

export type TimelineYear = {
  year: number;
  venue: string;
  teams: string;
  raised: string;
  beneficiary: string;
  photo?: boolean;
};

type Props = {
  years: TimelineYear[];
  /** Figure shown under the year marked `photo` (an Astro slot). */
  photo?: ReactNode;
};

/** Share of the viewport height where the line "draws" to. */
const TRIGGER = 0.6;

export default function HistoryTimeline({ years, photo }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  const [progress, setProgress] = useState(1);
  const [active, setActive] = useState<boolean[]>(() => years.map(() => true));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const trigger = window.innerHeight * TRIGGER;
      const rect = list.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (trigger - rect.top) / rect.height)));
      setActive(itemRefs.current.map((el) => (el ? el.getBoundingClientRect().top + 12 <= trigger : true)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    setAnimated(true);
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`htl${animated ? ' is-animated' : ''}`} style={{ '--progress': progress } as CSSProperties}>
      <span className="htl-track" aria-hidden="true" />
      <span className="htl-fill" aria-hidden="true" />
      <ol ref={listRef} className="htl-list">
        {years.map((y, i) => (
          <li
            key={y.year}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`htl-item${active[i] ? ' is-active' : ''}`}
          >
            <span className="htl-dot" aria-hidden="true" />
            <p className="num htl-year">{y.year}</p>
            <div className="htl-content">
              <h3 className="htl-venue">{y.venue}</h3>
              <p className="body htl-facts">{y.teams}</p>
              <p className="body htl-facts">
                {y.raised ? (
                  <>
                    <span className="num htl-amount">{y.raised}</span> til {y.beneficiary}
                  </>
                ) : (
                  y.beneficiary
                )}
              </p>
              {y.photo && photo}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
