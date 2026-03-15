import { createSignal } from "solid-js";

const MovieRate = () => {
  return (
    <div class="bg-gray-900 text-white">
      {/* Navigation */}
      <nav class="bg-gray-800 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-yellow-400">MovieRate</div>
            <div class="flex gap-6">
              <a href="#" class="hover:text-yellow-400">Home</a>
              <a href="#" class="text-yellow-400">Movies</a>
              <a href="#" class="hover:text-yellow-400">TV Shows</a>
              <a href="#" class="hover:text-yellow-400">Top Rated</a>
            </div>
            <div class="flex gap-4">
              <input type="text" placeholder="Search movies..." class="bg-gray-700 px-4 py-2 rounded-lg w-64" />
              <button class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold">Sign In</button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex gap-8">
          {/* Filters Sidebar */}
          <div class="w-64 flex-shrink-0">
            <div class="bg-gray-800 rounded-lg p-6 sticky top-8">
              <h2 class="text-xl font-bold mb-6">Filters</h2>

              {/* Sort By */}
              <div class="mb-6">
                <label class="block text-sm font-semibold mb-2 text-gray-300">Sort By</label>
                <select class="w-full bg-gray-700 rounded px-3 py-2 text-white">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Release Date</option>
                  <option>Title A-Z</option>
                </select>
              </div>

              {/* Genres */}
              <div class="mb-6">
                <label class="block text-sm font-semibold mb-2 text-gray-300">Genres</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" />
                    <span class="text-sm">Action</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" checked />
                    <span class="text-sm">Sci-Fi</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" />
                    <span class="text-sm">Drama</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" />
                    <span class="text-sm">Comedy</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" />
                    <span class="text-sm">Horror</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" />
                    <span class="text-sm">Thriller</span>
                  </label>
                </div>
              </div>

              {/* Release Year */}
              <div class="mb-6">
                <label class="block text-sm font-semibold mb-2 text-gray-300">Release Year</label>
                <div class="flex gap-2">
                  <input type="number" placeholder="From" class="w-full bg-gray-700 rounded px-3 py-2 text-white" value="2020" />
                  <input type="number" placeholder="To" class="w-full bg-gray-700 rounded px-3 py-2 text-white" value="2024" />
                </div>
              </div>

              {/* Rating */}
              <div class="mb-6">
                <label class="block text-sm font-semibold mb-2 text-gray-300">Minimum Rating</label>
                <select class="w-full bg-gray-700 rounded px-3 py-2 text-white">
                  <option>Any Rating</option>
                  <option>7.0+</option>
                  <option selected>8.0+</option>
                  <option>9.0+</option>
                </select>
              </div>

              <button class="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold">Apply Filters</button>
              <button class="w-full border border-gray-600 py-2 rounded-lg mt-2">Clear All</button>
            </div>
          </div>

          {/* Movies Grid */}
          <div class="flex-1">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-bold">Browse Movies</h1>
              <span class="text-gray-400">Showing 248 results</span>
            </div>

            <div class="grid grid-cols-4 gap-6">
              {/* Movie Cards */}
              {[...Array(12)].map((_, index) => (
                <div  class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all cursor-pointer">
                  <img
                    src="https://via.placeholder.com/250x375"
                    alt="Movie"
                    class="w-full h-80 object-cover"
                  />
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2">Movie Title {index + 1}</h3>
                    <div class="flex items-center justify-between text-sm mb-2">
                      <span class="text-yellow-400">★ 8.{index + 1}</span>
                      <span class="text-gray-400">2024</span>
                    </div>
                    <div class="flex gap-1">
                      <span class="bg-gray-700 text-xs px-2 py-1 rounded">Sci-Fi</span>
                      <span class="bg-gray-700 text-xs px-2 py-1 rounded">Action</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div class="flex justify-center items-center gap-2 mt-12">
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">Previous</button>
              <button class="px-4 py-2 bg-yellow-400 text-gray-900 rounded font-semibold">1</button>
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">2</button>
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">3</button>
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">4</button>
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">5</button>
              <button class="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer class="bg-gray-800 border-t border-gray-700 mt-12">
        <div class="max-w-7xl mx-auto px-6 py-8">
          <div class="text-center text-gray-400">
            <p>&copy; 2024 MovieRate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieRate;
