import { NextResponse } from "next/server";

const API_BASE_URL = "https://v3.football.api-sports.io";

export async function GET() {
  const apiKey = process.env.API_FOOTBALL_KEY;
  const leagueId = process.env.FOOTBALL_LEAGUE_ID ?? "1";
  const season = process.env.FOOTBALL_SEASON ?? "2022";

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "API_FOOTBALL_KEY is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const url = new URL("/fixtures", API_BASE_URL);

    url.searchParams.set("league", leagueId);
    url.searchParams.set("season", season);

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": apiKey,
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "The football data provider returned an error.",
          providerStatus: response.status,
        },
        {
          status: 502,
        },
      );
    }

    const data = await response.json();

    if (data.errors && Object.keys(data.errors).length > 0) {
      return NextResponse.json(
        {
          error: "The football data provider rejected the request.",
          details: data.errors,
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      competition: "FIFA World Cup",
      season,
      results: data.results ?? 0,
      fixtures: data.response ?? [],
    });
  } catch (error) {
    console.error("Failed to retrieve fixtures:", error);

    return NextResponse.json(
      {
        error: "Unable to retrieve fixtures.",
      },
      {
        status: 500,
      },
    );
  }
}