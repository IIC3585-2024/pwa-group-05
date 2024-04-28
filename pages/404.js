export default function() {
  return `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
        <p class="text-lg text-gray-500 mb-12">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a href="/" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
          Go back to homepage
        </a>
      </div>
    </div>
  `;
}
