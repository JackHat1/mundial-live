const matches = [
  {
    id: 1,
    time: "18:00",
    group: "Group A",
    homeTeam: "Mexico",
    homeFlag: "🇲🇽",
    awayTeam: "South Africa",
    awayFlag: "🇿🇦",
    status: "Upcoming",
  },
  {
    id: 2,
    time: "21:00",
    group: "Group B",
    homeTeam: "Brazil",
    homeFlag: "🇧🇷",
    awayTeam: "Spain",
    awayFlag: "🇪🇸",
    status: "Upcoming",
  },
  {
    id: 3,
    time: "23:30",
    group: "Group C",
    homeTeam: "Argentina",
    homeFlag: "🇦🇷",
    awayTeam: "Japan",
    awayFlag: "🇯🇵",
    status: "Upcoming",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Mundial<span className="text-emerald-400">Live</span>
            </h1>
            <p className="text-xs text-slate-400">World Football Center</p>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a className="text-white" href="#">
              Home
            </a>
            <a className="hover:text-white" href="/matches">
              Matches
            </a>
            <a className="hover:text-white" href="/standings">
              Standings
            </a>
            <a className="hover:text-white" href="#">
              Bracket
            </a>
          </nav>

          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
            ⚙ Settings
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            WORLD CUP 2026
          </p>

          <h2 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
            Every match.
            <br />
            Every moment.
          </h2>

          <p className="mt-4 max-w-xl text-slate-400">
            Live scores, match statistics, standings and knockout brackets in
            one place.
          </p>
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Live now</h3>

            <div className="flex items-center gap-2 text-sm text-red-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Live
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-blue-500/10 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                67&apos; LIVE
              </span>

              <span className="text-sm text-slate-400">Group D</span>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-center">
                <div className="mb-3 text-5xl">🇫🇷</div>
                <p className="font-semibold">France</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold md:text-5xl">2 - 1</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
                  Second half
                </p>
              </div>

              <div className="text-center">
                <div className="mb-3 text-5xl">🇩🇪</div>
                <p className="font-semibold">Germany</p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Latest event</span>
                <span className="font-medium">
                  ⚽ 64&apos; Kylian Mbappé
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today&apos;s matches</h3>
              <p className="text-sm text-slate-400">Friday, June 12</p>
            </div>

            <a
              href="/matches"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              View all →
            </a>
          </div>

          <div className="grid gap-4">
            {matches.map((match) => (
              <article
                key={match.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{match.group}</span>
                  <span>{match.status}</span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-right font-medium">
                      {match.homeTeam}
                    </span>
                    <span className="text-3xl">{match.homeFlag}</span>
                  </div>

                  <div className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold">
                    {match.time}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{match.awayFlag}</span>
                    <span className="font-medium">{match.awayTeam}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer className="mt-12 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-slate-500">
          Independent football companion. Not affiliated with FIFA.
        </div>
      </footer>
    </main>
  );
}