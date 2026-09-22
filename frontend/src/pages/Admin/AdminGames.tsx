import { CgFileAdd } from "solid-icons/cg";
import { createSignal, For, onMount, Show } from "solid-js";
import AddGameImg from "../../assets/add_game.svg";
import EditGameImg from "../../assets/edit_game.svg";
import DeleteGameImg from "../../assets/delete_game.svg";
import { FiEdit, FiList, FiGrid } from "solid-icons/fi";
import { TbTrash } from "solid-icons/tb";
import { axiosWithAuth as axios } from "../../configs/axios_conf";
import { useNavigate } from "@solidjs/router";

interface GameRecordsType {
  title: string;
  id: number;
  banner?: string; // Using this field for the image URL as requested
}

type ActionMode = "add" | "edit" | "delete" | null;
type ViewMode = "list" | "grid";

// Module-level state
const [gameRecords, setGameRecords] = createSignal<GameRecordsType[]>([]);
const [selectedGame, setSelectedGame] = createSignal<GameRecordsType | null>(null);
const [actionMode, setActionMode] = createSignal<ActionMode>(null);
const [formName, setFormName] = createSignal("");
const [viewMode, setViewMode] = createSignal<ViewMode>("list");
const serverAddr= import.meta.env.VITE_serverAddress
// Simulated API fetch
async function fetchGames(): Promise<GameRecordsType[]> {
  const result = await axios.get(import.meta.env.VITE_adminEndpoint + "/gamerecords");
  console.log(result.data);
  return result.data;
}

const GamesCreatedList = () => {
  onMount(async () => {
    const data = await fetchGames();
    setGameRecords(data);
  });

  return (
    <div class="mt-4">
      <Show
        when={gameRecords().length > 0}
        fallback={<p class="text-sm text-gray-400 text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">No games found.</p>}
      >
        <div class={viewMode() === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-2"}>
          <For each={gameRecords()}>
            {(game_rec) => (
              
              <div
                class={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex ${
                  viewMode() === "grid" ? "flex-col" : "items-center px-5 py-3"
                } ${
                  selectedGame()?.id === game_rec.id ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-100"
                }`}
                onClick={() => {
                  setSelectedGame(game_rec);
                  setFormName(game_rec.title);
                }}
              >
                {/* Tile View Image */}
                {viewMode() === "grid" && (
                  <div class="h-36 w-full bg-gray-50 flex-shrink-0 border-b border-gray-100 relative">
                    {game_rec.banner ? (
                      <img src={ serverAddr+game_rec.banner} alt={game_rec.title} class="h-full w-full object-cover" />
                    ) : (<>
                      <div class="h-full w-full flex items-center justify-center text-gray-400 text-xs font-medium">No Image</div>
                    </>
                    )}
                  </div>
                )}

                {/* Content Details */}
                <div class={`flex ${viewMode() === "grid" ? "flex-col p-4 gap-1 w-full" : "flex-1 items-center"}`}>
                  <span class={`text-sm text-gray-500 font-medium ${viewMode() === "grid" ? "order-2 text-xs" : "w-12"}`}>
                    #{game_rec.id}
                  </span>
                  
                  <span class={`text-sm font-semibold text-gray-800 ${viewMode() === "grid" ? "order-1 truncate" : "flex-1 ml-4"}`}>
                    {game_rec.title}
                  </span>
                  
                  <span class={`text-xs font-semibold rounded-md transition-colors ${
                    viewMode() === "grid" ? "order-3 mt-2 inline-block w-fit" : "ml-auto"
                  } ${
                    selectedGame()?.id === game_rec.id ? "bg-blue-50 text-blue-600 px-2.5 py-1" : "text-transparent"
                  }`}>
                    {selectedGame()?.id === game_rec.id ? "Selected" : ""}
                  </span>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

const AdminGames = () => {
  const handleAdd = () => {
    if (!formName().trim()) return;
    const newGame: GameRecordsType = {
      id: Date.now(),
      title: formName().trim(),
    };
    setGameRecords((prev) => [...prev, newGame]);
    setFormName("");
    setActionMode(null);
  };

  const handleEdit = () => {
    if (!selectedGame() || !formName().trim()) return;
    setGameRecords((prev) =>
      prev.map((g) =>
        g.id === selectedGame()!.id ? { ...g, title: formName().trim() } : g
      )
    );
    setSelectedGame(null);
    setFormName("");
    setActionMode(null);
  };

  const handleDelete = () => {
    if (!selectedGame()) return;
    setGameRecords((prev) => prev.filter((g) => g.id !== selectedGame()!.id));
    setSelectedGame(null);
    setFormName("");
    setActionMode(null);
  };

  const navi = useNavigate();

  return (
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-6xl mx-auto">
        
        {/* Header */}
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Game Management</h1>
          <p class="text-sm text-gray-500 mt-1">Add, edit, or remove games from the platform.</p>
        </div>

        {/* Action Buttons (Modern Card Approach) */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => { navi("./addnew"); }}
            class="p-6 flex flex-col justify-center items-center bg-white border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition duration-200 cursor-pointer group"
          >
            <div class="flex items-center gap-x-2 text-blue-600 font-semibold mb-4 group-hover:scale-105 transition-transform">
              <CgFileAdd size={22} />
              <span>Add Game Record</span>
            </div>
            <img src={AddGameImg} height={60} width={200} class="opacity-90 group-hover:opacity-100 transition-opacity" alt="Add" />
          </div>

          <button
            disabled={!selectedGame()}
            onClick={() => { if (selectedGame()) setActionMode("edit"); }}
            class={`p-6 flex flex-col justify-center items-center bg-white border rounded-2xl transition duration-200 group ${
              selectedGame() 
                ? "border-gray-200 hover:border-green-300 hover:shadow-md cursor-pointer" 
                : "opacity-60 cursor-not-allowed border-gray-100 bg-gray-50/50"
            }`}
          >
            <div class={`flex items-center gap-x-2 font-semibold mb-4 transition-transform ${selectedGame() ? "text-green-600 group-hover:scale-105" : "text-gray-400"}`}>
              <FiEdit size={22} />
              <span>Edit Game Record</span>
            </div>
            <img src={EditGameImg} height={60} width={200} class={`transition-opacity ${selectedGame() ? "opacity-90 group-hover:opacity-100" : "opacity-40 grayscale"}`} alt="Edit" />
          </button>

          <button
            disabled={!selectedGame()}
            onClick={() => { if (selectedGame()) setActionMode("delete"); }}
            class={`p-6 flex flex-col justify-center items-center bg-white border rounded-2xl transition duration-200 group ${
              selectedGame() 
                ? "border-gray-200 hover:border-yellow-400 hover:shadow-md cursor-pointer" 
                : "opacity-60 cursor-not-allowed border-gray-100 bg-gray-50/50"
            }`}
          >
            <div class={`flex items-center gap-x-2 font-semibold mb-4 transition-transform ${selectedGame() ? "text-yellow-500 group-hover:scale-105" : "text-gray-400"}`}>
              <TbTrash size={22} />
              <span>Remove Game Record</span>
            </div>
            <img src={DeleteGameImg} height={60} width={200} class={`transition-opacity ${selectedGame() ? "opacity-90 group-hover:opacity-100" : "opacity-40 grayscale"}`} alt="Delete" />
          </button>
        </div>

        {/* Action Panel */}
        {actionMode() === "add" && (
          <div class="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <input
              class="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="New game name..."
              value={formName()}
              onInput={(e) => setFormName(e.currentTarget.value)}
            />
            <button onClick={handleAdd} class="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition shadow-sm">
              Save
            </button>
            <button onClick={() => setActionMode(null)} class="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        )}

        {actionMode() === "edit" && (
          <div class="flex gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <input
              class="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              placeholder="Updated name..."
              value={formName()}
              onInput={(e) => setFormName(e.currentTarget.value)}
            />
            <button onClick={handleEdit} class="px-6 py-2.5 bg-green-600 text-white font-medium text-sm rounded-lg hover:bg-green-700 transition shadow-sm">
              Update
            </button>
            <button onClick={() => setActionMode(null)} class="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        )}

        {actionMode() === "delete" && selectedGame() && (
          <div class="flex items-center gap-4 mb-6 px-5 py-4 bg-red-50/50 border border-red-100 rounded-xl">
            <span class="text-sm text-red-800 flex-1">
              Are you sure you want to delete <strong>{selectedGame()!.title}</strong>?
            </span>
            <button onClick={handleDelete} class="px-6 py-2 bg-red-500 text-white font-medium text-sm rounded-lg hover:bg-red-600 transition shadow-sm">
              Confirm
            </button>
            <button onClick={() => setActionMode(null)} class="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        )}

        {/* Game List with View Toggle */}
        <div class="bg-gray-100/50 rounded-2xl p-5 border border-gray-100">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-bold uppercase tracking-widest text-gray-500">
              All Games ({gameRecords().length})
            </h2>
            
            {/* View Toggle */}
            <div class="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
              <button
                class={`p-1.5 rounded-md transition ${viewMode() === 'list' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FiList size={18} />
              </button>
              <button
                class={`p-1.5 rounded-md transition ${viewMode() === 'grid' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FiGrid size={18} />
              </button>
            </div>
          </div>
          
          <GamesCreatedList />
        </div>
      </div>
    </div>
  );
};

export default AdminGames;