import { createSignal } from 'solid-js'


function Home(){
    return(
        <>
        <div class="bg-gray-900 text-white">
    <nav class="bg-gray-800 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-yellow-400">MovieRate</div>
                <div class="flex gap-6">
                    <a href="#" class="text-yellow-400">Home</a>
                    <a href="#" class="hover:text-yellow-400">Movies</a>
                    <a href="#" class="hover:text-yellow-400">TV Shows</a>
                    <a href="#" class="hover:text-yellow-400">Top Rated</a>
                </div>
                <div class="flex gap-4">
                    <input type="text" placeholder="Search movies..." class="bg-gray-700 px-4 py-2 rounded-lg w-64"/>
                    <button class="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold">Sign In</button>
                </div>
            </div>
        </div>
    </nav>

    <div class="bg-gradient-to-r from-purple-900 to-blue-900 py-20">
        <div class="max-w-7xl mx-auto px-6">
            <h1 class="text-5xl font-bold mb-4">Featured Today</h1>
            <div class="flex gap-8">
                <img src="https://via.placeholder.com/400x600" alt="Featured Movie" class="rounded-lg w-80 h-96 object-cover"/>
                <div class="flex flex-col justify-center">
                    <h2 class="text-4xl font-bold mb-4">The Dark Universe</h2>
                    <div class="flex items-center gap-4 mb-4">
                        <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-bold text-xl">8.7</span>
                        <span class="text-gray-300">2024 • Sci-Fi • 2h 28m</span>
                    </div>
                    <p class="text-gray-300 text-lg mb-6 max-w-2xl">A gripping tale of humanity's last stand against an alien invasion that threatens to consume Earth in darkness. Follow the journey of unlikely heroes as they discover the key to survival.</p>
                    <div class="flex gap-4">
                        <button class="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg">Watch Trailer</button>
                        <button class="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold text-lg">More Info</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-6">Trending Now</h2>
        <div class="grid grid-cols-6 gap-4">
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Stellar Odyssey</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 8.2</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Night Hunter</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 7.9</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Lost Horizons</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 8.5</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Echo Chamber</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 7.6</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Silent Storm</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 8.8</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Aftermath</div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-yellow-400">★ 7.4</span>
                        <span class="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-6">Browse by Genre</h2>
        <div class="grid grid-cols-4 gap-4">
            <div class="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <h3 class="text-2xl font-bold">Action</h3>
            </div>
            <div class="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <h3 class="text-2xl font-bold">Drama</h3>
            </div>
            <div class="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <h3 class="text-2xl font-bold">Sci-Fi</h3>
            </div>
            <div class="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <h3 class="text-2xl font-bold">Comedy</h3>
            </div>
        </div>
    </div>

    <footer class="bg-gray-800 border-t border-gray-700 mt-12">
        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="text-center text-gray-400">
                <p>&copy; 2024 MovieRate. All rights reserved.</p>
            </div>
        </div>
    </footer>
    </div>
    </>
    )
}

export default Home