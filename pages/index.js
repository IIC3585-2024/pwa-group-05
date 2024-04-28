export default function () {
  return `
    <header class="bg-slate-800 py-4">
      <div class="container mx-auto flex items-center">
        <img src="../assets/images/anon_notepad.png" alt="Notepad" class="w-16 h-16 mr-4" />
        <h1 class="text-white text-3xl font-bold">EchoPad</h1>
      </div>
    </header>
    <div class="container mx-auto py-8">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 md:pr-8">
          <h2 class="text-7xl font-bold mb-4">Create a New Notepad</h2>
          <div class="mb-4">
            <input
              type="text"
              id="notepad"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notepad name"
            />
          </div>
          <button
            id="create-notepad"
            class="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Notepad
          </button>
          <p class="mt-4 text-gray-600">Type a new or existing notepad name</p>
        </div>
        <div class="md:w-1/2 mt-8 md:mt-0">
          <img src="../assets/images/person.png" alt="Person" class="w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  `;
}
