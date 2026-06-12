"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MatchFilter = "All" | "Live" | "Upcoming" | "Finished";

type ApiFixture = {
  fixture: {
    id: number;
    date: string;
    timestamp: number;
    timezone: string;
    venue: {
      name: string | null;
      city: string | null;
    } | null;
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };

  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
  };

  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };

    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };

  goals: {
    home: number | null;
    away: number | null;
  };
};

type FixturesResponse = {
  competition?: string;
  season?: string;
  results?: number;
  fixtures?: ApiFixture[];
  error?: string;
};

const filters: MatchFilter[] = [
  "All",
  "Live",
  "Upcoming",
  "Finished",
];

const liveStatuses = [
  "1H",
  "HT",
  "2H",
  "ET",
  "BT",
  "P",
  "LIVE",
  "INT",
];

const upcomingStatuses = ["TBD", "NS", "PST"];

const finishedStatuses = ["FT", "AET", "PEN"];

function getMatchCategory(status: string): Exclude<MatchFilter, "All"> {
  if (liveStatuses.includes(status)) {
    return "Live";
  }

  if (finishedStatuses.includes(status)) {
    return "Finished";
  }

  return "Upcoming";
}

function formatDateHeader(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatMatchTime(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

function getStatusLabel(fixture: ApiFixture) {
  const shortStatus = fixture.fixture.status.short;
  const elapsed = fixture.fixture.status.elapsed;

  if (liveStatuses.includes(shortStatus)) {
    return elapsed ? `${elapsed}' LIVE` : "LIVE";
  }

  if (finishedStatuses.includes(shortStatus)) {
    return shortStatus === "PEN" ? "Penalties" : "Finished";
  }

  if (shortStatus === "PST") {
    return "Postponed";
  }

  return "Upcoming";
}

function getStatusClasses(fixture: ApiFixture) {
  const category = getMatchCategory(fixture.fixture.status.short);

  if (category === "Live") {
    return "bg-red-500/15 text-red-400";
  }

  if (category === "Finished") {
    return "bg-white/10 text-slate-300";
  }

  return "bg-amber-400/10 text-amber-300";
}

export default function MatchesPage() {
  const [fixtures, setFixtures] = useState<ApiFixture[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<MatchFilter>("All");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFixtures() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/fixtures");

      const data: FixturesResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to retrieve matches.");
      }

      const orderedFixtures = [...(data.fixtures ?? [])].sort(
        (first, second) =>
          first.fixture.timestamp - second.fixture.timestamp,
      );

      setFixtures(orderedFixtures);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unable to retrieve matches.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFixtures();
  }, []);

  const filteredFixtures = useMemo(() => {
    if (activeFilter === "All") {
      return fixtures;
    }

    return fixtures.filter(
      (fixture) =>
        getMatchCategory(fixture.fixture.status.short) ===
        activeFilter,
    );
  }, [activeFilter, fixtures]);

  const groupedFixtures = useMemo(() => {
    return filteredFixtures.reduce<Record<string, ApiFixture[]>>(
      (groups, fixture) => {
        const dateKey = fixture.fixture.date.slice(0, 10);

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push(fixture);

        return groups;
      },
      {},
    );
  }, [filteredFixtures]);

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mundial<span className="text-emerald-400">Live</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
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

          <button
            type="button"
            onClick={loadFixtures}
            disabled={isLoading}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-400">
            FIFA WORLD CUP
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Matches
          </h1>

          <p className="mt-3 text-slate-400">
            Real match data from the 2022 FIFA World Cup.
          </p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "whitespace-nowrap rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-[#07111f]"
                  : "whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <h2 className="text-lg font-bold text-red-300">
              Matches could not be loaded
            </h2>

            <p className="mt-2 text-sm text-red-200/70">{error}</p>

            <button
              type="button"
              onClick={loadFixtures}
              className="mt-5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#07111f]"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          Object.keys(groupedFixtures).length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
              <p className="text-slate-400">
                No matches were found for this filter.
              </p>
            </div>
          )}

        {!isLoading && !error && (
          <div className="space-y-10">
            {Object.entries(groupedFixtures).map(
              ([date, dateFixtures]) => (
                <section key={date}>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {formatDateHeader(date)}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {dateFixtures.length}{" "}
                        {dateFixtures.length === 1 ? "match" : "matches"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {dateFixtures.map((match) => {
                      const category = getMatchCategory(
                        match.fixture.status.short,
                      );

                      const hasScore =
                        match.goals.home !== null &&
                        match.goals.away !== null;

                      return (
                        <article
                          key={match.fixture.id}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-emerald-400/30 hover:bg-white/[0.07]"
                        >
                          <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-medium text-emerald-400">
                                {match.league.round}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {match.fixture.venue?.name ??
                                  "Venue unavailable"}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                match,
                              )}`}
                            >
                              {getStatusLabel(match)}
                            </span>
                          </div>

                          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
                            <div className="flex items-center justify-end gap-3">
                              <span className="text-right text-sm font-semibold md:text-base">
                                {match.teams.home.name}
                              </span>

                              <img
                                src={match.teams.home.logo}
                                alt={`${match.teams.home.name} logo`}
                                className="h-10 w-10 object-contain md:h-12 md:w-12"
                              />
                            </div>

                            <div className="min-w-20 text-center">
                              {hasScore ? (
                                <div className="rounded-xl bg-white/5 px-4 py-2 text-lg font-bold">
                                  {match.goals.home}
                                  <span className="mx-2 text-slate-500">
                                    -
                                  </span>
                                  {match.goals.away}
                                </div>
                              ) : (
                                <div className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold">
                                  {formatMatchTime(match.fixture.date)}
                                </div>
                              )}

                              {category === "Finished" && (
                                <p className="mt-2 text-[10px] uppercase tracking-wider text-slate-500">
                                  Full time
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <img
                                src={match.teams.away.logo}
                                alt={`${match.teams.away.name} logo`}
                                className="h-10 w-10 object-contain md:h-12 md:w-12"
                              />

                              <span className="text-sm font-semibold md:text-base">
                                {match.teams.away.name}
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ),
            )}
          </div>
        )}
      </section>
    </main>
  );
}