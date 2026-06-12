import Link from "next/link";
import { notFound } from "next/navigation";

type MatchEvent = {
  minute: string;
  type: "goal" | "card" | "substitution";
  text: string;
  team: "home" | "away";
};

type MatchData = {
  id: string;
  competition: string;
  group: string;
  stadium: string;
  status: string;
  minute: string;
  homeTeam: string;
  homeFlag: string;
  homeScore: number;
  awayTeam: string;
  awayFlag: string;
  awayScore: number;
  events: MatchEvent[];
  statistics: {
    label: string;
    home: number;
    away: number;
    suffix?: string;
  }[];
  homeLineup: string[];
  awayLineup: string[];
};

const matches: Record<string, MatchData> = {
  "1": {
    id: "1",
    competition: "World Cup 2026",
    group: "Group A",
    stadium: "Estadio Azteca",
    status: "LIVE",
    minute: "67'",
    homeTeam: "Mexico",
    homeFlag: "🇲🇽",
    homeScore: 1,
    awayTeam: "South Africa",
    awayFlag: "🇿🇦",
    awayScore: 0,
    events: [
      {
        minute: "54'",
        type: "goal",
        text: "Santiago Giménez",
        team: "home",
      },
      {
        minute: "41'",
        type: "card",
        text: "Teboho Mokoena",
        team: "away",
      },
      {
        minute: "23'",
        type: "card",
        text: "Edson Álvarez",
        team: "home",
      },
    ],
    statistics: [
      { label: "Possession", home: 58, away: 42, suffix: "%" },
      { label: "Total shots", home: 12, away: 7 },
      { label: "Shots on target", home: 5, away: 2 },
      { label: "Corners", home: 6, away: 3 },
      { label: "Fouls", home: 9, away: 11 },
      { label: "Pass accuracy", home: 87, away: 81, suffix: "%" },
    ],
    homeLineup: [
      "Luis Malagón",
      "Jorge Sánchez",
      "César Montes",
      "Johan Vásquez",
      "Jesús Gallardo",
      "Edson Álvarez",
      "Luis Chávez",
      "Orbelín Pineda",
      "Hirving Lozano",
      "Santiago Giménez",
      "Uriel Antuna",
    ],
    awayLineup: [
      "Ronwen Williams",
      "Khuliso Mudau",
      "Mothobi Mvala",
      "Siyanda Xulu",
      "Aubrey Modiba",
      "Teboho Mokoena",
      "Sphephelo Sithole",
      "Themba Zwane",
      "Percy Tau",
      "Evidence Makgopa",
      "Thapelo Maseko",
    ],
  },

  "2": {
    id: "2",
    competition: "World Cup 2026",
    group: "Group B",
    stadium: "MetLife Stadium",
    status: "UPCOMING",
    minute: "21:00",
    homeTeam: "Brazil",
    homeFlag: "🇧🇷",
    homeScore: 0,
    awayTeam: "Spain",
    awayFlag: "🇪🇸",
    awayScore: 0,
    events: [],
    statistics: [
      { label: "Possession", home: 0, away: 0, suffix: "%" },
      { label: "Total shots", home: 0, away: 0 },
      { label: "Shots on target", home: 0, away: 0 },
      { label: "Corners", home: 0, away: 0 },
    ],
    homeLineup: [
      "Lineup",
      "will",
      "be",
      "available",
      "before",
      "kick-off",
    ],
    awayLineup: [
      "Lineup",
      "will",
      "be",
      "available",
      "before",
      "kick-off",
    ],
  },

  "3": {
    id: "3",
    competition: "World Cup 2026",
    group: "Group C",
    stadium: "SoFi Stadium",
    status: "UPCOMING",
    minute: "23:30",
    homeTeam: "Argentina",
    homeFlag: "🇦🇷",
    homeScore: 0,
    awayTeam: "Japan",
    awayFlag: "🇯🇵",
    awayScore: 0,
    events: [],
    statistics: [
      { label: "Possession", home: 0, away: 0, suffix: "%" },
      { label: "Total shots", home: 0, away: 0 },
      { label: "Shots on target", home: 0, away: 0 },
      { label: "Corners", home: 0, away: 0 },
    ],
    homeLineup: [
      "Lineup",
      "will",
      "be",
      "available",
      "before",
      "kick-off",
    ],
    awayLineup: [
      "Lineup",
      "will",
      "be",
      "available",
      "before",
      "kick-off",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(matches).map((id) => ({ id }));
}

function EventIcon({ type }: { type: MatchEvent["type"] }) {
  if (type === "goal") {
    return <span>⚽</span>;
  }

  if (type === "card") {
    return <span>🟨</span>;
  }

  return <span>🔄</span>;
}

export default async function MatchCenterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = matches[id];

  if (!match) {
    notFound();
  }

  const isLive = match.status === "LIVE";

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mundial<span className="text-emerald-400">Live</span>
          </Link>

          <nav className="flex items-center gap-5 text-sm text-slate-300">
            <Link href="/matches" className="hover:text-white">
              ← Matches
            </Link>

            <Link
              href="/standings"
              className="hidden hover:text-white md:block"
            >
              Standings
            </Link>

            <Link
              href="/bracket"
              className="hidden hover:text-white md:block"
            >
              Bracket
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8 md:py-12">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-emerald-400">
            {match.competition}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {match.group} · {match.stadium}
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-white/[0.04] to-blue-500/10 p-5 shadow-2xl md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <span
              className={
                isLive
                  ? "rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-400"
                  : "rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300"
              }
            >
              {isLive ? `${match.minute} LIVE` : match.status}
            </span>

            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
            >
              🔔 Follow
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-10">
            <div className="text-center">
              <div className="text-5xl md:text-7xl">{match.homeFlag}</div>

              <h1 className="mt-4 text-base font-bold md:text-2xl">
                {match.homeTeam}
              </h1>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black tracking-tight md:text-7xl">
                {match.homeScore}
                <span className="mx-2 text-slate-500 md:mx-4">-</span>
                {match.awayScore}
              </div>

              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                {isLive ? "Second half" : match.minute}
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-7xl">{match.awayFlag}</div>

              <h1 className="mt-4 text-base font-bold md:text-2xl">
                {match.awayTeam}
              </h1>
            </div>
          </div>
        </section>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {[
            ["Summary", "summary"],
            ["Timeline", "timeline"],
            ["Statistics", "statistics"],
            ["Lineups", "lineups"],
          ].map(([label, section]) => (
            <a
              key={section}
              href={`#${section}`}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <section
          id="summary"
          className="mt-8 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
        >
          <h2 className="text-xl font-bold">Match summary</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Competition
              </p>
              <p className="mt-2 font-semibold">{match.competition}</p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Stage
              </p>
              <p className="mt-2 font-semibold">{match.group}</p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Venue
              </p>
              <p className="mt-2 font-semibold">{match.stadium}</p>
            </div>
          </div>
        </section>

        <section
          id="timeline"
          className="mt-6 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Timeline</h2>

            {isLive && (
              <span className="flex items-center gap-2 text-xs text-red-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                Live updates
              </span>
            )}
          </div>

          {match.events.length > 0 ? (
            <div className="mt-6 space-y-3">
              {match.events.map((event, index) => (
                <div
                  key={`${event.minute}-${index}`}
                  className="grid grid-cols-[50px_1fr] items-center gap-3 rounded-2xl bg-white/[0.04] p-4"
                >
                  <span className="font-bold text-emerald-400">
                    {event.minute}
                  </span>

                  <div
                    className={
                      event.team === "home"
                        ? "flex items-center gap-3"
                        : "flex items-center justify-end gap-3 text-right"
                    }
                  >
                    <EventIcon type={event.type} />
                    <span className="font-medium">{event.text}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-white/[0.04] p-8 text-center">
              <p className="text-slate-400">
                Match events will appear when the game begins.
              </p>
            </div>
          )}
        </section>

        <section
          id="statistics"
          className="mt-6 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
        >
          <h2 className="text-xl font-bold">Statistics</h2>

          <div className="mt-6 space-y-6">
            {match.statistics.map((stat) => {
              const total = stat.home + stat.away;
              const homeWidth =
                total === 0 ? 50 : Math.round((stat.home / total) * 100);

              return (
                <div key={stat.label}>
                  <div className="mb-3 grid grid-cols-[60px_1fr_60px] items-center gap-4">
                    <span className="text-left font-bold">
                      {stat.home}
                      {stat.suffix}
                    </span>

                    <span className="text-center text-sm text-slate-400">
                      {stat.label}
                    </span>

                    <span className="text-right font-bold">
                      {stat.away}
                      {stat.suffix}
                    </span>
                  </div>

                  <div className="flex h-2 overflow-hidden rounded-full bg-blue-400/30">
                    <div
                      className="rounded-full bg-emerald-400"
                      style={{ width: `${homeWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="lineups"
          className="mt-6 scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
        >
          <h2 className="text-xl font-bold">Starting lineups</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] p-5">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">{match.homeFlag}</span>
                <h3 className="font-bold">{match.homeTeam}</h3>
              </div>

              <ol className="space-y-3">
                {match.homeLineup.map((player, index) => (
                  <li
                    key={`${player}-${index}`}
                    className="flex items-center gap-3 border-b border-white/5 pb-3 text-sm"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-bold text-emerald-400">
                      {index + 1}
                    </span>

                    <span>{player}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-white/[0.04] p-5">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">{match.awayFlag}</span>
                <h3 className="font-bold">{match.awayTeam}</h3>
              </div>

              <ol className="space-y-3">
                {match.awayLineup.map((player, index) => (
                  <li
                    key={`${player}-${index}`}
                    className="flex items-center gap-3 border-b border-white/5 pb-3 text-sm"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-400/10 text-xs font-bold text-blue-300">
                      {index + 1}
                    </span>

                    <span>{player}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}