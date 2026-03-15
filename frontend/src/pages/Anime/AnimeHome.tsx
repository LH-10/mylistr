export function AnimeHome() {
  const animes = [
    { title: "Jujutsu Kaisen", studio: "MAPPA", rating: "9.2", img: "/placeholder.svg?height=600&width=400" },
    { title: "Solo Leveling", studio: "A-1 Pictures", rating: "8.9", img: "/placeholder.svg?height=600&width=400" },
    { title: "Demon Slayer", studio: "Ufotable", rating: "9.5", img: "/placeholder.svg?height=600&width=400" },
    { title: "Attack on Titan", studio: "MAPPA", rating: "9.8", img: "/placeholder.svg?height=600&width=400" },
  ]

  return (
    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-orange-50/30">
      <section class="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent z-10" />
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Anime Hero"
          class="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div class="container mx-auto px-4 relative z-20 text-center">
          <h1 class="text-7xl md:text-9xl font-serif font-black mb-4 italic tracking-tighter text-black">
            UNLEASHED
          </h1>
          <p class="text-lg text-black/80 max-w-xl mx-auto mb-8 font-mono tracking-tight">
            Discover the latest seasonal hits and legendary classics.
          </p>
          <div class="flex justify-center gap-4">
            <button class="bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-orange-600/20">
              Watch Now
            </button>
            <button class="bg-black/5 backdrop-blur-md px-10 py-4 rounded-full font-bold hover:bg-black/10 transition-colors text-black border border-black/10">
              Season List
            </button>
          </div>
        </div>
      </section>

      <section class="container mx-auto px-4 py-20">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-4xl font-serif font-bold italic underline decoration-orange-600 underline-offset-8 text-black">
            Top Seasonal
          </h2>
          <span class="text-black/40 font-mono text-sm hover:text-black cursor-pointer transition-colors">
            View All Schedule
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {animes.map((anime, i) => (
            <div
              class="flex gap-6 group bg-white p-4 rounded-2xl hover:shadow-xl hover:shadow-orange-900/5 transition-all cursor-pointer border border-black/5"
            >
              <div class="w-1/3 aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={anime.img || "/placeholder.svg"}
                  alt={anime.title}
                  class="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div class="flex-grow py-4">
                <span class="text-xs font-mono text-orange-600 mb-2 block">{anime.studio}</span>
                <h3 class="text-2xl font-serif font-bold mb-4 text-black">{anime.title}</h3>
                <div class="flex items-center gap-4 mb-6">
                  <div class="px-2 py-1 bg-black text-white text-xs font-bold rounded">HD</div>
                  <div class="flex items-center gap-1 text-orange-500">
                    <span class="text-sm font-bold">★ {anime.rating}</span>
                  </div>
                </div>
                <button class="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-black">
                  Add to Watchlist <span class="text-xl text-orange-600">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
