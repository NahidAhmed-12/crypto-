import { URL } from 'url';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const API_BASE_URL = process.env.COINGECKO_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("COINGECKO_API_BASE_URL is not defined in environment variables.");
    return new Response(
      JSON.stringify({ error: 'API configuration error. The base URL is not set on the server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId');
    
    let fetchUrl;

    if (coinId) {
      fetchUrl = `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`;
    } else {
      // নিশ্চিত করুন যে এই লাইনে API_BASE_URL ব্যবহৃত হয়েছে
      fetchUrl = `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    }

    const apiResponse = await fetch(fetchUrl);

    if (!apiResponse.ok) {
      console.error(`CoinGecko API Error: ${apiResponse.status} ${apiResponse.statusText}`);
      return new Response(
        JSON.stringify({ error: `Failed to fetch data from CoinGecko API. Status: ${apiResponse.status}` }),
        { status: apiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await apiResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      },
    });

  } catch (error) {
    console.error('Serverless function crashed:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred on the server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}