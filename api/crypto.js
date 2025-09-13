// Vercel এই ফাইলটিকে স্বয়ংক্রিয়ভাবে একটি সার্ভারলেস ফাংশনে পরিণত করবে।
// এই ফাংশনটি /api/crypto রুটে উপলব্ধ হবে।

export default async function handler(request, response) {
  // এনভায়রনমেন্ট ভেরিয়েবল থেকে বেস URL পড়া হচ্ছে
  const API_BASE_URL = process.env.COINGECKO_API_BASE_URL;

  if (!API_BASE_URL) {
    return response.status(500).json({ error: 'API base URL is not configured.' });
  }

  // রিকোয়েস্টের URL থেকে কোয়েরি প্যারামিটার বের করা
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const coinId = searchParams.get('coinId');

  let fetchUrl;

  if (coinId) {
    // যদি coinId থাকে, তবে চার্টের ডেটা ফেচ করা হবে
    fetchUrl = `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`;
  } else {
    // অন্যথায়, সকল মার্কেটের ডেটা ফেচ করা হবে
    fetchUrl = `${API__URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  }

  try {
    const apiResponse = await fetch(fetchUrl);
    if (!apiResponse.ok) {
      // API থেকে কোনো এরর আসলে সেটি ক্লায়েন্টকে পাঠানো হবে
      throw new Error(`Error from CoinGecko API: ${apiResponse.statusText}`);
    }
    const data = await apiResponse.json();
    
    // সফলভাবে ডেটা ক্লায়েন্টকে পাঠানো হচ্ছে
    return response.status(200).json(data);

  } catch (error) {
    console.error('API route error:', error);
    return response.status(500).json({ error: 'Failed to fetch data from the external API.' });
  }
}