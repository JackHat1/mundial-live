import Link from "next/link";

const matches = [
  {
    id: 1,
    group: "Group A",
    time: "18:00",
    homeTeam: "Mexico",
    homeFlag: "🇲🇽",
    awayTeam: "South Africa",
    awayFlag: "🇿🇦",
    status: "Upcoming",
  },
  {
    id: 2,
    group: "Group B",
    time: "21:00",
    homeTeam: "Brazil",
    homeFlag: "🇧🇷",
    awayTeam: "Spain",
    awayFlag: "🇪🇸",
    status: "Upcoming",
  },
  {
    id: 3,
    group: "Group C",
    time: "23:30",
    homeTeam: "Argentina",
    homeFlag: "🇦🇷",
    awayTeam: "Japan",
    awayFlag: "🇯🇵",
    status: "Upcoming",
  },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mundial<span className="text-emerald-400">Live</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/matches" className="text-emerald-400">
              Matches
            </Link>
            <Link href="/standings" className="hover:text-white">
            Standings
            </Link>
            <Link href="/bracket" className="hover:text-white">
            Bracket
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-400">
            WORLD CUP 2026
          </p>

          <h1 className="mt-2 text-4xl font-bold">Matches</h1>

          <p className="mt-2 text-slate-400">
            View upcoming, live and completed matches.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {["All", "Live", "Upcoming", "Finished"].map((filter, index) => (
            <button
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-[#07111f]"
                  : "rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 hover:bg-white/10"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mb-5">
          <h2 className="text-lg font-semibold">Friday, June 12</h2>
          <p className="text-sm text-slate-400">{matches.length} matches</p>
        </div>

        <div className="grid gap-4">
{matches.map((match) => (
  <Link
    key={match.id}
    href={`/matches/${match.id}`}
    className="block"
  >
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/[0.07]">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>{match.group}</span>
                <span>{match.status}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-right text-sm font-medium md:text-base">
                    {match.homeTeam}
                  </span>

                  <span className="text-3xl">{match.homeFlag}</span>
                </div>

                <div className="rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold md:px-4">
                  {match.time}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl">{match.awayFlag}</span>

                  <span className="text-sm font-medium md:text-base">
                    {match.awayTeam}
                  </span>
                </div>
              </div>
            </article>
        </Link>
        ))}
        </div>
      </section>
    </main>
  );
}