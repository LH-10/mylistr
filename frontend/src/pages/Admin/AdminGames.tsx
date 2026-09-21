import {  CgFileAdd } from "solid-icons/cg";
import { createSignal, For, onMount } from "solid-js";
import AddGameImg from "../../assets/add_game.svg"
import EditGameImg from "../../assets/edit_game.svg"
import DeleteGameImg from "../../assets/delete_game.svg"
import { FiEdit } from "solid-icons/fi";
import { TbTrash } from "solid-icons/tb";
import { axiosWithAuth as axios } from "../../configs/axios_conf";
import {  useNavigate } from "@solidjs/router";
interface GameRecordsType {
  title: string;
  id: number;
}

type ActionMode = "add" | "edit" | "delete" | null;

const [gameRecords, setGameRecords] = createSignal<GameRecordsType[]>([]);
const [selectedGame, setSelectedGame] = createSignal<GameRecordsType | null>(null);
const [actionMode, setActionMode] = createSignal<ActionMode>(null);
const [formName, setFormName] = createSignal("");

// Simulated API fetch
async function fetchGames(): Promise<GameRecordsType[]> {
  const result=await axios.get(import.meta.env.VITE_adminEndpoint+"/gamerecords")
  console.log(result.data)
  return result.data
}

const GamesCreatedList = () => {
  onMount(async () => {
    const data = await fetchGames();
    setGameRecords(data);
    console.log(data.length)
  });

  return (
    <div class="flex flex-col gap-2 mt-4">
      <For each={gameRecords()}>
        {(gamerec) => (
          <div
            class="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            classList={{ "ring-2 ring-blue-500": selectedGame()?.id === gamerec.id }}
            onClick={() => {
              setSelectedGame(gamerec);
              setFormName(gamerec.title);
            }}
          >
            <span class="text-sm font-medium text-gray-700">#{gamerec.id}</span>
            <span class="text-sm text-gray-900 flex-1 ml-4">{gamerec.title}</span>
            <span class="text-xs text-gray-400">
              {selectedGame()?.id === gamerec.id ? "Selected" : ""}
            </span>
          </div>
        )}
      </For>
      {gameRecords().length === 0 && (
        <p class="text-sm text-gray-400 text-center py-6">No games found.</p>
      )}
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
        g.id === selectedGame()!.id ? { ...g, name: formName().trim() } : g
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
  
  const navi=useNavigate()
  
  return (
    <div class="min-h-screen   bg-gray-100 p-4">
      <div class="mx-auto">
        {/* Header */}
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Game Management</h1>
          {/* <p class="text-sm text-gray-500 mt-1">Add, edit, or remove games from the platform.</p> */}
        </div>

        {/* Action Buttons */}
        <div class="flex flex-row gap-3 mb-4">
          <div 
            onClick={() => { navi("./addnew"); }}
            class="px-6 py-5 text-sm font-medium bg-blue-500 flex gap-y-5 flex-col justify-center items-center  text-white rounded-lg hover:bg-blue-600 transition"
            >
            <div class="flex gap-x-5 ">
            <p>Add Game Record</p>
            <CgFileAdd size={20}/>
            </div>
            <img src={AddGameImg} height={60} width={220} class=""/>
          </div>
          <button 
            disabled={!selectedGame()}
            onClick={() => { if (selectedGame()) setActionMode("edit"); }}
            class="px-6 py-5 text-sm font-medium bg-green-500 flex gap-y-5 flex-col justify-center items-center text-white rounded-lg hover:bg-green-600 transition"
            >
            <div class="flex gap-x-5 ">
            <p>Edit Game Record</p>
            <FiEdit size={20}/>
            </div>
            <img src={EditGameImg} height={60} width={220} class=""/>
          </button>
          <button 
            disabled={!selectedGame()}
            onClick={() => { if (selectedGame()) setActionMode("delete"); }}
            class="px-6 py-5 text-sm font-medium bg-yellow-400 flex gap-y-5 flex-col justify-center items-center text-white rounded-lg hover:bg-yellow-500 transition"
          >
            <div class="flex gap-x-5 ">
            <p>Remove Game Record</p>
            <TbTrash size={20}/>
            </div>
            <img src={DeleteGameImg} height={60} width={220} class=""/>
          </button>
       
        </div>

        {/* Action Panel */}
        {actionMode() === "add" && (
          <div class="flex gap-2 mb-4">
            <input
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="New game name..."
              value={formName()}
              onInput={(e) => setFormName(e.currentTarget.value)}
            />
            <button onClick={handleAdd} class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
              Save
            </button>
            <button onClick={() => setActionMode(null)} class="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        )}

        {actionMode() === "edit" && (
          <div class="flex gap-2 mb-4">
            <input
              class="flex-1 border border-green-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Updated name..."
              value={formName()}
              onInput={(e) => setFormName(e.currentTarget.value)}
            />
            <button onClick={handleEdit} class="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition">
              Update
            </button>
            <button onClick={() => setActionMode(null)} class="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        )}

        {actionMode() === "delete" && selectedGame() && (
          <div class="flex items-center gap-3 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <span class="text-sm text-red-700">
              Delete <strong>{selectedGame()!.title}</strong>?
            </span>
            <button onClick={handleDelete} class="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
              Confirm
            </button>
            <button onClick={() => setActionMode(null)} class="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        )}

        {/* Game List */}
        <div class="bg-gray-100 rounded-xl p-4">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            All Games ({gameRecords().length})
          </h2>
          <GamesCreatedList />
        </div>
      </div>
    </div>
  );
};

export default AdminGames;