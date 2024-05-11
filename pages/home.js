const HomePage = () => `
<header class="bg-slate-800 py-4">
  <div class="container px-10 flex items-center h-15">
    <img src="../images/anon_notepad.png" alt="Notepad" class="w-16 h-16 mr-4" />
    <h1 class="text-white text-lg text-3xl font-bold">EchoPad</h1>
  </div>
</header>
<div class="container mx-auto py-8">
  <div class="flex flex-col md:flex-row items-center">
    <div class="md:w-1/2 md:pr-8 md:ml-6">
      <h2 class="text-3xl md:text-7xl sm:text-5xl font-bold mb-4 max-sm:mx-1">Create a New Notepad</h2>
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
      <p class="mt-4 text-gray-600 max-md:text-center">Type a new or existing notepad name</p>
    </div>
    <div class="w-72 md:w-1/2 max-md:mt-8 md:mr-4">
      <img src="../images/person.png" alt="Person" class="w-full max-w-md ml-auto" />
    </div>
  </div>
</div>
`;

export default HomePage;
