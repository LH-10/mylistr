import {createSignal, For} from 'solid-js';
import { OcFlame2 } from 'solid-icons/oc';
import { BsStar ,BsPlay,BsArrowUpRightCircle,BsClock} from 'solid-icons/bs';


function GameHome (){
    const [recentReleases,setRecentReleases]=createSignal<any[]>([
      { id: 1, title: "Ethereal Whispers", image: "/placeholder.svg?height=280&width=200", rating: 4.9 },
      { id: 2, title: "Crimson Tide", image: "/placeholder.svg?height=280&width=200", rating: 4.8 },
      { id: 3, title: "Pixel Paradise", image: "/placeholder.svg?height=280&width=200", rating: 4.7 },
      { id: 4, title: "Atomic Blast", image: "/placeholder.svg?height=280&width=200", rating: 4.6 },
    ])
    const [mostPlayed,setMostPlayed]=createSignal<any[]>( [
      { id: 1, title: "Cyber Nexus", image: "/placeholder.svg?height=280&width=200", rating: 4.8, players: "2.4M" },
      { id: 2, title: "Shadow Realms", image: "/placeholder.svg?height=280&width=200", rating: 4.6, players: "1.8M" },
      { id: 3, title: "Quantum Rush", image: "/placeholder.svg?height=280&width=200", rating: 4.9, players: "3.1M" },
      { id: 4, title: "Neon Knights", image: "/placeholder.svg?height=280&width=200", rating: 4.7, players: "2.2M" },
    ])
    const [topRated,setTopRated]=createSignal<any[]>([
      { id: 1, title: "Void War", image: "/placeholder.svg?height=280&width=200", players: "5.2M", trending: true },
      {
        id: 2,
        title: "Eclipse Protocol",
        image: "/placeholder.svg?height=280&width=200",
        players: "4.8M",
        trending: true,
      },
      { id: 3, title: "Inferno Squad", image: "/placeholder.svg?height=280&width=200", players: "3.9M", trending: false },
      { id: 4, title: "Luna Quest", image: "/placeholder.svg?height=280&width=200", players: "3.5M", trending: false },
    ])
    
    
    
    const news = [
      { id: 1, title: "New Season: Galactic Conquest Begins", date: "Jan 10, 2025", category: "Update" },
      { id: 2, title: "Community Event: Tournament with $100K Prize Pool", date: "Jan 8, 2025", category: "Event" },
      { id: 3, title: "Developer Interview: Behind Quantum Rush", date: "Jan 5, 2025", category: "Feature" },
    ]
    
    const GameCard = ({ game, variant = "default" }: any) => (
      <div class="group card-hover relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all">
        <div class="relative h-64 overflow-hidden">
          <img
            src={game.image || "/placeholder.svg"}
            alt={game.title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <h3 class="text-xl font-bold text-white drop-shadow-lg">{game.title}</h3>
            <button class="bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
              <BsPlay size={20} fill="currentColor" />
            </button>
          </div>
        </div>
        <div class="p-4 space-y-3">
          {variant === "recent" && (
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1 text-yellow-400">
                <BsStar size={16} fill="currentColor" />
                <span class="text-sm font-semibold">{game.rating}</span>
              </div>
              <span class="text-xs text-muted-foreground">{game.players} players</span>
            </div>
          )}
          {variant === "trending" && (
            <div class="flex items-center gap-2">
              {game.trending && (
                <div class="flex items-center gap-1 bg-accent/20 text-accent mx-22 px-2 py-1 rounded text-xs font-semibold">
                  <BsArrowUpRightCircle size={14} />
                  Trending
                </div>
              )}
              <span class="text-xs text-muted-foreground ml-auto">{game.players} players</span>
            </div>
          )}
          {variant === "rated" && (
            <div class="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <BsStar  size={14} fill={i < Math.floor(game.rating) ? "currentColor" : "none"} />
              ))}
              <span class="text-sm font-semibold ml-auto">{game.rating}</span>
            </div>
          )}
        </div>
      </div>
    )
    
    return (
      <div class="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background accent */}
        <div class="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div class="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    
        <div class="relative z-10">
          {/* Recent Games Section */}
          <section class="recent-games py-16 px-6 md:px-12">
            <div class="max-w-7xl mx-auto">
              <div class="accent-line mb-12">
                <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Recently Added
                </h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <For each={recentReleases()}>
                  {(game)=>( <GameCard  game={game} variant="trending" />)}
                </For>
              </div>
            </div>
          </section>
    
          {/* Most Played Section */}
          <section class="most-played py-16 px-6 md:px-12 border-t border-border">
            <div class="max-w-7xl mx-auto">
              <div class="accent-line mb-12">
                <h2 class="text-4xl md:text-5xl font-bold flex items-center gap-3">
                  <OcFlame2 class="text-accent" size={40} />
                  Most Played
                </h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <For each={mostPlayed()}>
                  {(game)=>( <GameCard  game={game} variant="trending" />)}
                </For>
               
              </div>
            </div>
          </section>
    
          {/* Top Rated Section */}
          <section class="top-rated py-16 px-6 md:px-12 border-t border-border">
            <div class="max-w-7xl mx-auto">
              <div class="accent-line mb-12">
                <h2 class="text-4xl md:text-5xl font-bold flex items-center gap-3">
                  <BsStar class="text-primary" size={40} fill="currentColor" />
                  Top Rated
                </h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <For each={topRated()}>
                  {(game)=>(                
                    <GameCard game={game} variant="rated" />)}
                </For>
                
              </div>
            </div>
          </section>
    
          {/* News Section */}
          <section class="news py-16 px-6 md:px-12 border-t border-border">
            <div class="max-w-7xl mx-auto">
              <div class="accent-line mb-12">
                <h2 class="text-4xl md:text-5xl font-bold flex items-center gap-3">
                  <BsClock class="text-secondary" size={40} />
                  News & Updates
                </h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <For each={news}>
                  {(item)=>(<>
                    <div
                        class="group card-hover bg-card border border-border rounded-lg p-6 hover:border-primary cursor-pointer"
                      >
                        <div class="flex items-start justify-between mb-4">
                          <span class="inline-block bg-primary/20 text-primary px-3 py-1 rounded text-xs font-semibold">
                            {item.category}
                          </span>
                          <span class="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <h3 class="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      </div>
                  
                  </>)}
                </For>
                
              </div>
            </div>
          </section>
        </div>
      </div>
    )
    
}

export default GameHome;
// return(
//     <>
//     <div class='flex h-screen w-full'>
//         <div class='bg-blue-200  h-20 w-screen px-10 text-3xl '>
//             <section class='recent-games'>
//                 <h1>Recent Games</h1>
//                 <div class='Cards-slider'>

//                 </div>
//             </section>
//             <section class='most-played'>
//                 <h1>Most Played Games</h1>
//                 <div class='Cards'>

//                 </div>
//             </section>
//             <section class='top-rated'>
//                 <h1>Top Rated Games</h1>
//                 <div class='Cards'>

//                 </div>
//             </section>
//             <section class='news'>

//             </section>
//         </div>
//     </div>
//     </>
// )