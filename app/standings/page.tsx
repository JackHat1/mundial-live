import Link from "next/link";

const groups = [
  {
    name: "Group A",
    teams: [
      {
        position: 1,
        name: "Mexico",
        flag: "🇲🇽",
        played: 2,
        won: 2,
        drawn: 0,
        lost: 0,
        goalsFor: 5,
        goalsAgainst: 1,
        goalDifference: 4,
        points: 6,
      },
      {
        position: 2,
        name: "South Africa",
        flag: "🇿🇦",
        played: 2,
        won: 1,
        drawn: 0,
        lost: 1,
        goalsFor: 3,
        goalsAgainst: 2,
        goalDifference: 1,
        points: 3,
      },
      {
        position: 3,
        name: "Canada",
        flag: "🇨🇦",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        goalsFor: 1,
        goalsAgainst: 3,
        goalDifference: -2,
        points: 1,
      },
      {
        position: 4,
        name: "Japan",
        flag: "🇯🇵",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        goalsFor: 1,
        goalsAgainst: 4,
        goalDifference: -3,
        points: 1,
      },
    ],
  },
  {
    name: "Group B",
    teams: [
      {
        position: 1,
        name: "Brazil",
        flag: "🇧🇷",
        played: 2,
        won: 2,
        drawn: 0,
        lost: 0,
        goalsFor: 6,
        goalsAgainst: 1,
        goalDifference: 5,
        points: 6,
      },
      {
        position: 2,
        name: "Spain",
        flag: "🇪🇸",
        played: 2,
        won: 1,
        drawn: 1,
        lost: 0,
        goalsFor: 4,
        goalsAgainst: 2,
        goalDifference: 2,
        points: 4,
      },
      {
        position: 3,
        name: "USA",
        flag: "🇺🇸",
        played: 2,
        won: 0,
        drawn: 1,
        lost: 1,
        goalsFor: 2,
        goalsAgainst: 4,
        goalDifference: -2,
        points: 1,
      },
      {
        position: 4,
        name: "Morocco",
        flag: "🇲🇦",
        played: 2,
        won: 0,
        drawn: 0,
        lost: 2,
        goalsFor: 1,
        goalsAgainst: 6,
        goalDifference: -5,
        points: 0,
      },
    ],
  },
];

export default function StandingsPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <header className="border-b border-white/10 bg-[#07111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Mundial<span className="text-emerald-400">Live</span>
          </Link>

          <nav className="flex gap-5 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/matches" className="hover:text-white">
              Matches
            </Link>

            <Link href="/standings" className="text-emerald-400">
              Standings
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-400">
            WORLD CUP 2026
          </p>

          <h1 className="mt-2 text-4xl font-bold">Standings</h1>

          <p className="mt-2 text-slate-400">
            Group rankings, goal difference and qualification positions.
          </p>
        </div>

        <div className="grid gap-6">
          {groups.map((group) => (
            <section
              key={group.name}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
            >
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="text-lg font-semibold">{group.name}</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-5 py-3">Pos</th>
                      <th className="px-5 py-3">Team</th>
                      <th className="px-4 py-3 text-center">P</th>
                      <th className="px-4 py-3 text-center">W</th>
                      <th className="px-4 py-3 text-center">D</th>
                      <th className="px-4 py-3 text-center">L</th>
                      <th className="px-4 py-3 text-center">GF</th>
                      <th className="px-4 py-3 text-center">GA</th>
                      <th className="px-4 py-3 text-center">GD</th>
                      <th className="px-5 py-3 text-center">Pts</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.teams.map((team) => {
                      const qualified = team.position <= 2;

                      return (
                        <tr
                          key={team.name}
                          className="border-t border-white/10 hover:bg-white/[0.04]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={`h-8 w-1 rounded-full ${
                                  qualified
                                    ? "bg-emerald-400"
                                    : "bg-transparent"
                                }`}
                              />

                              <span className="font-semibold">
                                {team.position}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{team.flag}</span>
                              <span className="font-medium">{team.name}</span>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.played}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.won}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.drawn}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.lost}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.goalsFor}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.goalsAgainst}
                          </td>

                          <td className="px-4 py-4 text-center">
                            {team.goalDifference > 0
                              ? `+${team.goalDifference}`
                              : team.goalDifference}
                          </td>

                          <td className="px-5 py-4 text-center font-bold">
                            {team.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-xs text-slate-400">
                <span className="h-3 w-1 rounded-full bg-emerald-400" />
                Qualified for the knockout stage
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}