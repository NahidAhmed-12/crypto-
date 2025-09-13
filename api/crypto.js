export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // এই কোডটি শুধু একটি পরীক্ষামূলক বার্তা পাঠাবে
  // যদি এটি কাজ করে, তার মানে আপনার ডিপ্লয়মেন্ট সফল হয়েছে
  const testResponse = {
    status: "Test Successful!",
    message: "Your latest code has been deployed correctly.",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(testResponse), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}