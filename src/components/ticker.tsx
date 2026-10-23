type TickerProps = {
  text: string;
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
  duration?: string;
  weight?: number;
};

export function Ticker({
  text,
  className,
  trackClassName,
  itemClassName,
  duration = "28s",
  weight = 900,
}: TickerProps) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className={`ticker-track cd ${trackClassName ?? ""}`}
        style={{
          animationDuration: duration,
          fontWeight: weight,
          letterSpacing: "0.14em",
        }}
      >
        <span className={itemClassName}>{text}</span>
        <span className={itemClassName} aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}
