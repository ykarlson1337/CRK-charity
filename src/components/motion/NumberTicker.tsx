// Adapted from 21st.dev "Number Ticker" (dillionverma/number-ticker).
// Changes: Danish number format, the final value is server-rendered so the
// number is correct without JavaScript, and reduced motion skips the count.
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

type Props = {
  value: number;
  /** Delay in seconds before counting starts once the number is in view. */
  delay?: number;
  decimalPlaces?: number;
  className?: string;
};

// Update the existing text node so React keeps owning it.
function setText(el: HTMLElement, text: string) {
  if (el.firstChild?.nodeType === Node.TEXT_NODE) el.firstChild.nodeValue = text;
  else el.textContent = text;
}

function format(n: number, decimalPlaces: number): string {
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(n.toFixed(decimalPlaces)));
}

export default function NumberTicker({ value, delay = 0, decimalPlaces = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const animate = useRef(false);

  // On mount: start from zero, unless the visitor prefers reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    animate.current = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate.current) setText(el, format(0, decimalPlaces));
    el.dataset.ready = '';
  }, [decimalPlaces]);

  useEffect(() => {
    if (!isInView || !animate.current) return;
    const timer = window.setTimeout(() => motionValue.set(value), delay * 1000);
    return () => window.clearTimeout(timer);
  }, [isInView, delay, value, motionValue]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) setText(ref.current, format(latest, decimalPlaces));
      }),
    [springValue, decimalPlaces],
  );

  return (
    <span ref={ref} className={['ticker', className].filter(Boolean).join(' ')} data-ticker="">
      {format(value, decimalPlaces)}
    </span>
  );
}
