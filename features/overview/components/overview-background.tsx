export function OverviewBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="overview-geometry overview-geometry-one" />
      <div className="overview-geometry overview-geometry-two" />
      <div className="overview-geometry overview-geometry-three" />
      <div className="overview-bokeh absolute left-[-14rem] top-[5rem] size-[34rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="overview-bokeh overview-bokeh-delay absolute right-[-16rem] top-[62rem] size-[40rem] rounded-full bg-emerald-300/7 blur-3xl" />
      <div className="overview-bokeh absolute bottom-[18rem] left-[16%] size-[30rem] rounded-full bg-sky-300/7 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-background/85 via-background/42 to-transparent" />
    </div>
  );
}
