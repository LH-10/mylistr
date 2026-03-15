import { createEffect, createSignal, Match, Switch } from "solid-js";
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Movie/MovieHome";
import GameHome from "./pages/Games/GameHome";
import { AnimeHome } from "./pages/Anime/AnimeHome";

function App(props: any) {
  const [activeTab, setActiveTab] = createSignal<"movie" | "anime" | "game">(
    "game",
  );
  createEffect(() => {
    console.log(activeTab());
  });
  return (
    <>
      <Header activeTab={activeTab} onTabChange={(s) => setActiveTab(s)} />
      <div class="flex w-[inherit] justify-center">
        <Switch>
          <Match when={activeTab() == "movie"}>
            <Home />
          </Match>
          <Match when={activeTab() == "game"}>
            <GameHome />
          </Match>
          <Match when={activeTab() == "anime"}>
            <AnimeHome />
          </Match>
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
