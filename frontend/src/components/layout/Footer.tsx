export function Footer() {
  return (
    <footer class="border-t border-black/5 py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div class="space-y-6">
            <div class="text-3xl font-serif font-bold tracking-tighter text-black">GAMMA.</div>
            <p class="text-black/40 text-sm leading-relaxed max-w-xs">
              Redefining the digital entertainment landscape through curated experiences and premium content delivery.
            </p>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-8">Navigation</h4>
            <ul class="space-y-4 text-sm font-medium text-black/60">
              <li>
                <a href="#" class="hover:text-black transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Artists
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Distribution
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-8">Social</h4>
            <ul class="space-y-4 text-sm font-medium text-black/60">
              <li>
                <a href="#" class="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Spotify
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-8">Newsletter</h4>
            <p class="text-sm text-black/40 mb-6">Stay updated with our latest drops.</p>
            <div class="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                class="bg-black/5 border border-black/5 rounded-lg px-4 py-2 text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-black text-black placeholder:text-black/30"
              />
              <button class="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/5 gap-6">
          <p class="text-xs text-black/20">© 2026 GAMMA Entertainment Group. All rights reserved.</p>
          <div class="flex gap-8 text-xs text-black/20">
            <a href="#" class="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" class="hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#" class="hover:text-black transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
