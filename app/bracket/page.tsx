import Link from "next/link";

type BracketMatch = {
  id: number;
  title: string;
  date: string;
  homeTeam: string;
  homeFlag: string;
  homeScore?: number;
  awayTeam: string;
  awayFlag: string;
  awayScore?: number;
  status: "Finished" | "Upcoming";
};

const rounds: {
  name: string;
  matches: BracketMatch[];
}[] = [
  {
    name: "Round of 16",
    matches: [
      {
        id: 1,
        title: "Match 49",
        date: "June 28 · 18:00",
        homeTeam: "Mexico",
        homeFlag: "🇲🇽",
        homeScore: 2,
        awayTeam: "Spain",
        awayFlag: "🇪🇸",
        awayScore: 1,
        status: "Finished",
      },
      {
        id: 2,
        title: "Match 50",
        date: "June 28 · 22:00",
        homeTeam: "Brazil",
        homeFlag: "🇧🇷",
        homeScore: 3,
        awayTeam: "Japan",
        awayFlag: "🇯🇵",
        awayScore: 0,
        status: "Finished",
      },
      {
        id: 3,
        title: "Match 51",
        date: "June 29 · 18:00",
        homeTeam: "France",
        homeFlag: "🇫🇷",
        homeScore: 2,
        awayTeam: "USA",
        awayFlag: "🇺🇸",
        awayScore: 0,
        status: "Finished",
      },
      {
        id: 4,
        title: "Match 52",
        date: "June 29 · 22:00",
        homeTeam: "Argentina",
        homeFlag: "🇦🇷",
        homeScore: 1,
        awayTeam: "Germany",
        awayFlag: "🇩🇪",
        awayScore: 2,
        status: "Finished",
      },
    ],
  },
  {
    name: "Quarter-finals",
    matches: [
      {
        id: 5,
        title: "Quarter-final 1",
        date: "July 4 · 19:00",
        homeTeam: "Mexico",
        homeFlag: "🇲🇽",
        awayTeam: "Brazil",
        awayFlag: "🇧🇷",
        status: "Upcoming",
      },
      {
        id: 6,
        title: "Quarter-final 2",
        date: "July 4 · 23:00",
        homeTeam: "France",
        homeFlag: "🇫🇷",
        awayTeam: "Germany",
        awayFlag: "🇩🇪",
        status: "Upcoming",
      },
    ],
  },
  {
    name: "Semi-finals",
    matches: [
      {
        id: 7,
        title: "Semi-final 1",
        date: "July 8 · 22:00",
        homeTeam: "Winner QF1",
        homeFlag: "🏳️",
        awayTeam: "Winner QF2",
        awayFlag: "🏳️",
        status: "Upcoming",
      },
    ],
  },
  {
    name: "Final",
    matches: [
      {
        id: 8,
        title: "World Cup Final",
        date: "July 19 · 22:00",
        homeTeam: "TBD",
        homeFlag: "🏆",
        awayTeam: "TBD",
        awayFlag: "🏆",
        status: "Upcoming",
      },
    ],
  },
];

function MatchCard({ match }: { match: BracketMatch }) {
  const homeWinner =
    match.status === "Finished" &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore > match.awayScore;

  const awayWinner =
    match.status === "Finished" &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore > match.homeScore;

  return (
    <article className="w-[280px] rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-lg transition hover:border-emerald-400/40 hover:bg-white/[0.08]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-emerald-400">
            {match.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">{match.date}</p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            match.status === "Finished"
              ? "bg-white/10 text-slate-300"
              : "bg-amber-400/10 text-amber-300"
          }`}
        >
          {match.status}
        </span>
      </div>

      <div
        className={`flex items-center justify-between rounded-xl px-3 py-3 ${
          homeWinner ? "bg-emerald-400/10" : "bg-white/[0.03]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{match.homeFlag}</span>
          <span
            className={`text-sm ${
              homeWinner ? "font-bold text-white" : "text-slate-300"
            }`}
          >
            {match.homeTeam}
          </span>
        </div>

        <span className="text-lg font-bold">
          {match.homeScore ?? "-"}
        </span>
      </div>

      <div
        className={`mt-2 flex items-center justify-between rounded-xl px-3 py-3 ${
          awayWinner ? "bg-emerald-400/10" : "bg-white/[0.03]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{match.awayFlag}</span>
          <span
            className={`text-sm ${
              awayWinner ? "font-bold text-white" : "text-slate-300"
            }`}
          >
            {match.awayTeam}
          </span>
        </div>

        <span className="text-lg font-bold">
          {match.awayScore ?? "-"}
        </span>
      </div>
    </article>
  );
}

export default function BracketPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mundial<span className="text-emerald-400">Live</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/matches" className="hover:text-white">
              Matches
            </Link>

            <Link href="/standings" className="hover:text-white">
              Standings
            </Link>

            <Link href="/bracket" className="text-emerald-400">
              Bracket
            </Link>
          </nav>

          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 md:hidden"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-400">
            WORLD CUP 2026
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Knockout Bracket
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Follow every knockout match from the Round of 16 to the final.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            Winner
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            Upcoming match
          </div>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="flex min-w-max items-stretch gap-8">
            {rounds.map((round) => (
              <section key={round.name} className="w-[280px]">
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="text-lg font-semibold">{round.name}</h2>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
                    {round.matches.length}
                  </span>
                </div>

                <div className="flex h-full flex-col justify-around gap-5">
                  {round.matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">
            Swipe horizontally on mobile to explore every knockout round.
          </p>
        </div>
      </section>
    </main>
  );
}