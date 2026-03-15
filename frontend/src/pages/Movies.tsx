import { createSignal } from "solid-js";

function Movies(){
    return(
        <>
        
        <div class="bg-gray-900 text-white">
    <nav class="bg-gray-800 border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold text-yellow-400">MovieRate</div>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-yellow-400">Home</a>
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

    <div class="bg-gradient-to-b from-gray-800 to-gray-900">
        <div class="max-w-7xl mx-auto px-6 py-12">
            <div class="flex gap-8">
                <img src="https://via.placeholder.com/300x450" alt="The Dark Universe" class="rounded-lg w-64 h-96 object-cover"/>
                <div class="flex-1">
                    <h1 class="text-5xl font-bold mb-4">The Dark Universe</h1>
                    <div class="flex items-center gap-4 mb-4">
                        <span class="text-gray-400">2024</span>
                        <span class="text-gray-400">•</span>
                        <span class="text-gray-400">PG-13</span>
                        <span class="text-gray-400">•</span>
                        <span class="text-gray-400">2h 28m</span>
                    </div>
                    <div class="flex gap-2 mb-6">
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Sci-Fi</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Action</span>
                        <span class="bg-gray-700 px-3 py-1 rounded text-sm">Adventure</span>
                    </div>
                    
                    <div class="bg-gray-800 p-6 rounded-lg mb-6">
                        <div class="flex items-center gap-8">
                            <div>
                                <div class="text-sm text-gray-400 mb-1">MOVIERATE RATING</div>
                                <div class="flex items-center gap-2">
                                    <span class="text-yellow-400 text-4xl font-bold">★ 8.7</span>
                                    <span class="text-gray-400">/10</span>
                                </div>
                                <div class="text-sm text-gray-400 mt-1">125K votes</div>
                            </div>
                            <div class="border-l border-gray-700 pl-8">
                                <div class="text-sm text-gray-400 mb-1">YOUR RATING</div>
                                <button class="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                    <span class="text-2xl">☆</span>
                                    <span class="text-lg">Rate</span>
                                </button>
                            </div>
                            <div class="border-l border-gray-700 pl-8">
                                <div class="text-sm text-gray-400 mb-1">POPULARITY</div>
                                <div class="text-2xl font-bold">🔥 #3</div>
                                <div class="text-sm text-gray-400 mt-1">This week</div>
                            </div>
                        </div>
                    </div>

                    <p class="text-gray-300 text-lg mb-6">A gripping tale of humanity's last stand against an alien invasion that threatens to consume Earth in darkness. Follow the journey of unlikely heroes as they discover the key to survival lies within an ancient cosmic secret.</p>
                    
                    <div class="flex gap-4">
                        <button class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold">▶ Watch Trailer</button>
                        <button class="border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">+ Watchlist</button>
                        <button class="border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">Share</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-6">Cast & Crew</h2>
        <div class="grid grid-cols-6 gap-6 mb-8">
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Actor" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">Sarah Mitchell</div>
                <div class="text-sm text-gray-400">Commander Kane</div>
            </div>
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Actor" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">James Rodriguez</div>
                <div class="text-sm text-gray-400">Dr. Chen</div>
            </div>
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Actor" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">Emma Thompson</div>
                <div class="text-sm text-gray-400">Captain Silva</div>
            </div>
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Actor" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">Marcus Lee</div>
                <div class="text-sm text-gray-400">General Hayes</div>
            </div>
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Director" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">David Zhang</div>
                <div class="text-sm text-gray-400">Director</div>
            </div>
            <div class="text-center">
                <img src="https://via.placeholder.com/150x150" alt="Writer" class="rounded-full w-32 h-32 mx-auto mb-2 object-cover"/>
                <div class="font-semibold">Lisa Anderson</div>
                <div class="text-sm text-gray-400">Writer</div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12 border-t border-gray-800">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold">User Reviews</h2>
            <button class="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold">Write a Review</button>
        </div>
        
        <div class="space-y-6">
            <div class="bg-gray-800 p-6 rounded-lg">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <img src="https://via.placeholder.com/50x50" alt="User" class="rounded-full w-12 h-12"/>
                        <div>
                            <div class="font-semibold">MovieBuff2024</div>
                            <div class="flex items-center gap-2 text-sm text-gray-400">
                                <span class="text-yellow-400">★★★★★</span>
                                <span>10/10</span>
                            </div>
                        </div>
                    </div>
                    <span class="text-gray-400 text-sm">2 days ago</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Absolutely mind-blowing!</h3>
                <p class="text-gray-300">This movie exceeded all my expectations. The visual effects are stunning, the story is compelling, and the performances are top-notch. A must-watch for any sci-fi fan!</p>
                <div class="flex gap-4 mt-4 text-sm text-gray-400">
                    <button class="hover:text-white">👍 Helpful (245)</button>
                    <button class="hover:text-white">💬 Reply</button>
                </div>
            </div>

            <div class="bg-gray-800 p-6 rounded-lg">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <img src="https://via.placeholder.com/50x50" alt="User" class="rounded-full w-12 h-12"/>
                        <div>
                            <div class="font-semibold">CinemaLover</div>
                            <div class="flex items-center gap-2 text-sm text-gray-400">
                                <span class="text-yellow-400">★★★★☆</span>
                                <span>8/10</span>
                            </div>
                        </div>
                    </div>
                    <span class="text-gray-400 text-sm">5 days ago</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Great entertainment with minor flaws</h3>
                <p class="text-gray-300">Solid sci-fi action movie with impressive world-building. The pacing could be better in the second act, but overall it's a thrilling ride. The cinematography is absolutely beautiful.</p>
                <div class="flex gap-4 mt-4 text-sm text-gray-400">
                    <button class="hover:text-white">👍 Helpful (132)</button>
                    <button class="hover:text-white">💬 Reply</button>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 class="text-3xl font-bold mb-6">More Like This</h2>
        <div class="grid grid-cols-6 gap-4">
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Stellar Odyssey</div>
                    <div class="text-sm text-yellow-400">★ 8.2</div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Cosmos Rising</div>
                    <div class="text-sm text-yellow-400">★ 7.9</div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Alien Protocol</div>
                    <div class="text-sm text-yellow-400">★ 8.4</div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Final Contact</div>
                    <div class="text-sm text-yellow-400">★ 7.7</div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Void Walkers</div>
                    <div class="text-sm text-yellow-400">★ 8.1</div>
                </div>
            </div>
            <div class="cursor-pointer hover:scale-105 transition-transform">
                <img src="https://via.placeholder.com/200x300" alt="Movie" class="rounded-lg w-full"/>
                <div class="mt-2">
                    <div class="font-semibold">Event Horizon 2</div>
                    <div class="text-sm text-yellow-400">★ 7.6</div>
                </div>
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

export default Movies