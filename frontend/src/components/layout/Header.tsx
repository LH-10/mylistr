// import { Search } from "lucide-react"
// import { cn } from "@/lib/utils"
import { For } from "solid-js"
import { BsSearch } from "solid-icons/bs"

interface HeaderProps {
  activeTab:()=>("movie" | "anime" | "game")
  onTabChange: (tab: "movie" | "anime" | "game") => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: "movie", label: "Movie" },
    { id: "anime", label: "Anime" },
    { id: "game", label: "Games" },
  ] as const

  return (
    <header class="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <div class="text-2xl font-serif font-bold tracking-tighter hover:opacity-80 transition-opacity cursor-pointer text-black">
          MyListR<span class="text-primary"></span>
        </div>

        {/* Continuous Segmented Control */}
        <nav class="hidden md:flex items-center p-1 bg-black/5 rounded-full border border-black/5">
          <For each={tabs}>
            {(menuItems)=>(
               <button
            
              onClick={() => onTabChange(menuItems.id)}
              class={`relative px-8 py-2 text-sm cursor-pointer font-medium transition-all rounded-full duration-300 
              ${activeTab() === menuItems.id ? "bg-black text-white shadow-md" : "text-black/40 hover:text-black"}`}>
              {menuItems.label}
            </button>
            )}
          </For>
        
        </nav>

        {/* Search Bar */}
        <div class="relative grow max-w-md hidden sm:block">
          <BsSearch class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" />
          <input
            type="text"
            placeholder={`Search ${activeTab()}...`}
            class="w-full bg-black/5 border border-black/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all text-black placeholder:text-black/30"
          />
        </div>

        {/* Mobile Menu / Right Side */}
        <button class="md:hidden p-2 text-black/40 hover:text-black">
          <div class="w-6 h-0.5 bg-current mb-1.5" />
          <div class="w-6 h-0.5 bg-current" />
        </button>
      </div>
    </header>
  )
}
