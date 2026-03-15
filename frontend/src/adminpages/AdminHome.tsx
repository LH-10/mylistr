import { createSignal, Show } from "solid-js";
import { BsBell, BsHouse } from "solid-icons/bs";
import { FiSettings, FiPackage, FiUsers } from "solid-icons/fi";
import { CgFileDocument, CgUser, CgLogOut } from "solid-icons/cg";
import type { IconTypes } from "solid-icons";
import { FaSolidGamepad, FaSolidSquareArrowUpRight } from "solid-icons/fa";
import { A } from "@solidjs/router";

// ────────────────────────────────────────────────
// Top Navigation
// ────────────────────────────────────────────────
function TopNav() {
  const [showProfileMenu, setShowProfileMenu] = createSignal(false);

  return (
    <nav class="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg flex items-center justify-between px-4 md:px-8">
      <div class="flex items-center gap-6 lg:gap-10">
        <h1 class="text-white text-xl md:text-2xl font-bold tracking-tight">Content Admin</h1>

        <ul class="hidden md:flex items-center gap-2">
          <NavLink icon={BsHouse} label="Dashboard" href="#home" />
          <NavLink icon={CgFileDocument} label="Articles" href="#articles" />
          <NavLink icon={FiPackage} label="Media" href="#media" />
          <NavLink icon={FiUsers} label="Announcements" href="#announcements" />
        </ul>
      </div>

      <div class="flex items-center gap-3 md:gap-5">
        <button class="relative text-white p-2 rounded-full hover:bg-white/20 transition">
          <BsBell size={22} />
          <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white/40" />
        </button>

        <div class="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu())}
            class="flex items-center gap-2.5 text-white px-3 py-2 rounded-lg hover:bg-white/15 transition"
          >
            <div class="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center">
              <CgUser size={20} />
            </div>
            <span class="font-medium hidden sm:inline">Admin</span>
          </button>

          <Show when={showProfileMenu()}>
            <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-200">
              <MenuItem icon={CgUser} label="Profile" href="#profile" />
              <MenuItem icon={FiSettings} label="Settings" href="#settings" />
              <hr class="my-2 border-gray-200" />
              <MenuItem icon={CgLogOut} label="Logout" href="#logout" danger />
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}

function NavLink(props: { icon: IconTypes; label: string; href: string }) {
  return (
    <li>
      <a
        href={props.href}
        class="flex items-center gap-2 px-4 py-2 text-white/95 rounded-lg hover:bg-white/20 active:bg-white/30 transition"
      >
        <props.icon size={18} />
        <span>{props.label}</span>
      </a>
    </li>
  );
}

function MenuItem(props: { icon: IconTypes; label: string; href: string; danger?: boolean }) {
  return (
    <a
      href={props.href}
      class={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
        props.danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <props.icon size={18} />
      {props.label}
    </a>
  );
}

// ────────────────────────────────────────────────
// Sidebar (now responsive)
// ────────────────────────────────────────────────
function Sidebar(props: { open?: boolean }) {
  return (
    <aside
      class={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300
        ${props.open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-auto
      `}
    >
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-400 mb-6 tracking-wide">Navigation</h2>
        <ul class="space-y-1.5">
          <SidebarLink icon={BsHouse} label="Dashboard" href="#home" active />
          <SidebarLink icon={CgFileDocument} label="Articles" href="#articles" />
          <SidebarLink icon={FiPackage} label="Media" href="#media" />
          <SidebarLink icon={FiUsers} label="Announcements" href="#announcements" />
        </ul>

        <h2 class="text-lg font-semibold text-gray-400 mt-10 mb-6 tracking-wide">Admin</h2>
        <ul class="space-y-1.5">
          <SidebarLink icon={CgUser} label="Profile" href="#profile" />
          <SidebarLink icon={FiSettings} label="Settings" href="#settings" />
        </ul>
      </div>
    </aside>
  );
}

function SidebarLink(props: { icon: IconTypes; label: string; href: string; active?: boolean }) {
  return (
    <li>
      <a
        href={props.href}
        class={`
          flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
          ${props.active 
            ? "bg-emerald-600/20 text-emerald-400" 
            : "text-gray-300 hover:bg-gray-800 hover:text-white"}
        `}
      >
        <props.icon size={20} />
        <span>{props.label}</span>
      </a>
    </li>
  );
}

// ────────────────────────────────────────────────
// Data Section (Generic Form Card)
// ────────────────────────────────────────────────
interface DataSectionProps {
  title: string;
  icon: IconTypes;
}

function DataSection(props: DataSectionProps) {
  const [formData, setFormData] = createSignal({ title: "", content: "" });

  const handleSubmit = () => {
    console.log(`Submitting ${props.title}:`, formData());
    alert(`${props.title} submitted! (check console)`);
    setFormData({ title: "", content: "" });
  };

  return (
    <div class="bg-white rounded-xl shadow border border-gray-200/70 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div class="flex items-center gap-3">
          <props.icon size={24} class="text-emerald-600" />
          <h2 class="text-xl font-semibold text-gray-800">{props.title}</h2>
        </div>
      </div>

      <div class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input
            type="text"
            value={formData().title}
            onInput={(e) => setFormData({ ...formData(), title: e.currentTarget.value })}
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition"
            placeholder={`New ${props.title.toLowerCase()} title...`}
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
          <textarea
            value={formData().content}
            onInput={(e) => setFormData({ ...formData(), content: e.currentTarget.value })}
            rows={5}
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none resize-y transition"
            placeholder={`Write ${props.title.toLowerCase()} content here...`}
          />
        </div>

        <div class="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition shadow-sm"
          >
            Add {props.title}
          </button>
          <button
            class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
            onClick={() => alert("Modify functionality not implemented yet")}
          >
            Modify
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Main Layout
// ────────────────────────────────────────────────
export default function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  return (
    <div class="bg-gray-50 min-h-screen">
      <TopNav />

      {/* Mobile sidebar toggle button */}
      <button
        class="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-emerald-700 text-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen())}
      >
        <span class="sr-only">Toggle menu</span>
        ≡
      </button>

      <div class="flex">
        <div class="lg:hidden">

        <Sidebar open={sidebarOpen()} />
        </div>

        <main class="
          flex-1 pt-20 lg:pt-5 
          w-screen 
          px-2  lg:px-4 
          pb-12
        ">
          <div class="max-w-7xl mx-auto space-y-8">
            {/* You can add dashboard summary cards here later */}

            <div class="space-y-6">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Manage Content</h1>
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* <DataSection title="Articles" icon={CgFileDocument} />
                <DataSection title="Media" icon={FiPackage} />
                <DataSection title="Announcements" icon={FiUsers} />
              */}
              <div class="flex px-6 py-8 rounded-xl justify-center bg-white items-center gap-6">
              <div class="flex items-center  px-6">

              <p class="font-bold text-justify   text-md md:text-lg lg:text-xl text-emerald-600">
              Games Dashboard
              </p>
               </div>
              <FaSolidGamepad size={40} class="text-emerald-500" />
              <A href="/games" class="ml-2 flex flex-row gap-x-2 cursor-pointer px-10
                           py-2.5 bg-emerald-500 text-white text-sm font-semibold
                           rounded-lg hover:bg-emerald-600 transition-colors">
                  <p>Go </p>
                    <FaSolidSquareArrowUpRight size={19}/>
              </A>
              </div>
              </div>
            </div>

            {/* Recent Activity can go here */}
          </div>
        </main>
      </div>

      {/* Backdrop for mobile sidebar */}
      <Show when={sidebarOpen()}>
        <div
          class="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      </Show>
    </div>
  );
}