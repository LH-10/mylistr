import { createStore, unwrap } from "solid-js/store";
import {
  axiosWithAuth as axios,
  checkAuthHeads,
} from "../../configs/axios_conf";
import { createEffect, createSignal, Show, type Accessor } from "solid-js";

function PopUp({
  show,
  data,
}: {
  show: Accessor<boolean>;
  data: Accessor<any>;
}) {
  return (
    <Show when={show()}>
      <div class="z-20 flex absolute w-full h-full left-0 top-0 justify-center items-center opacity-95 bg-gray-500 ">
        <div class="z-20 flex flex-col px-4 py-3 justify-center gap-10 bg-orange-500">
          <div>{JSON.stringify(data())}</div>
          <p class="text-white">Data has been recorded</p>
        </div>
      </div>
    </Show>
  );
}
export default function AddAdminGames() {
  type Game = {
    title: string;
    release: Date;
    developers: string;
    publishers: string;
    description: string;
    tags: string;
  };
  // const [gameTitle,setGameTitle]=createSignal<string>("")
  // const [gameRelease,setGameRelease]=createSignal<Date>((new Date()))
  // const [gameDevelopers,setGameDevelopers]=createSignal<string>("")
  // const [gamePublishers,setGamePublishers]=createSignal<string>("")
  // const [gameDescription,setGameDescription]=createSignal<string>("")
  // const [gameTags,setGameTags]=createSignal<string>("")
  const [game, setGame] = createStore<Game>({
    title: "Some Game",
    release: new Date(),
    developers: "Somedevs,dev2",
    publishers: "pub1,pub2",
    description: "awesome",
    tags: "action,adv,drama",
  });
  const [responseData, setResponseData] = createSignal<any>(null);
  const [gotResponse, setGotResponse] = createSignal(false);
  createEffect(() => {
    console.log(game.title);
    console.log(game);
  });

  const updateStore =
    <K extends keyof Game>(field: K) =>
    (
      e: InputEvent & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement;
        target: HTMLInputElement | HTMLTextAreaElement;
      },
    ) => {
      let val: Game[K];

      val = e.target.value as Game[K];

      setGame(field, val);
    };
  let imageRef: HTMLInputElement | undefined;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const adminEndpoint = import.meta.env.VITE_adminEndpoint;
    try {
      if (!checkAuthHeads()) {
        throw Error("Auth header not present");
      }
      const reqBody = {
        ...unwrap(game),
        developers: game.developers.split(","),
        publishers: game.publishers.split(","),
        tags: game.tags.split(","),
      };
      console.log(reqBody);
      const response = await axios.post(adminEndpoint + "/addgame", reqBody);
      if (response.data.Result == "success") {
        setResponseData(response.data);
        setGotResponse(true);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        class="flex flex-col bg-gray-50 px-10 py-8 gap-5 max-w-2xl mx-auto rounded-xl shadow-sm border border-gray-200"
      >
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Add New Game</h1>

        {/* Title */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">Game Title </label>
          <input
            type="text"
            name="title"
            value={game.title}
            onInput={updateStore("title")}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Game title"
            // required
          />
        </div>
        {/* Release Date */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">Release Date</label>
          <input
            type="date"
            name="release"
            value={game.release.toISOString().split("T")[0]}
            onChange={(e) => {
              setGame("release", new Date(e.target.value));
            }}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Developers */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">
            Developers (comma seperated)
          </label>
          <textarea
            name="developers"
            rows={3}
            value={game.developers}
            onInput={updateStore("developers")}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder=""
          />
        </div>

        {/* Publishers */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">
            Publishers (comma seperated)
          </label>
          <textarea
            name="publishers"
            rows={3}
            value={game.publishers}
            onInput={updateStore("publishers")}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder=""
          />
        </div>

        {/* Image */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">Game Cover Image</label>
          <input
            ref={imageRef}
            type="file"
            name="image"
            accept="image/*"
            // onChange={handleImageChange}
            class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100 cursor-pointer"
          />

          {/* <div class="flex items-center justify-center w-full">
                <div class="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base">
                    <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/></svg>
                    <p class="mb-2 text-sm">Click the button below to upload</p>
                    <p class="text-xs mb-4">Max. File Size: <span class="font-semibold">30MB</span></p>
                    <button type="button" onclick="document.getElementById('dropzone-file-2').click()" class="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                        <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                        Browse file
                    </button>
                    </div>
                </div>
                <input id="dropzone-file-2" type="file" class="hidden" />
                </div> */}

          {imageRef?.files && (
            <p class="text-sm text-gray-600 mt-1">
              Selected: {imageRef.files[0]?.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={5}
            value={game.description}
            onInput={updateStore("description")}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder=""
          />
        </div>

        {/* Tags */}
        <div class="flex flex-col gap-1">
          <label class="font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <textarea
            name="tags"
            rows={3}
            value={game.tags}
            onInput={updateStore("tags")}
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder="action , multiplayer , etc"
          />
        </div>

        <button
          type="submit"
          class="mt-6 bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Game
        </button>
      </form>
      <Show when={gotResponse()}>
        <div
          class="rounded-b-full absolute z-30 right-0 bg-red-500 top-0 w-20 h-20"
          onClick={() => setGotResponse(false)}
        ></div>
      </Show>
      <PopUp show={gotResponse} data={responseData} />
    </>
  );
}

// import { createStore, unwrap } from "solid-js/store";
// import {
//   axiosWithAuth as axios,
//   checkAuthHeads,
// } from "../../configs/axios_conf";
// import { createEffect, createSignal, For, Show } from "solid-js";

// // ── PopUp ──────────────────────────────────────────────────────────────────────
// function PopUp({
//   show,
//   data,
//   onClose,
// }: {
//   show: boolean;
//   data: any;
//   onClose: () => void;
// }) {
//   return (
//     <Show when={show && data}>
//       {/* Backdrop */}
//       <div
//         class="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
//         onClick={onClose}
//       >
//         {/* Card */}
//         <div
//           class="z-50 bg-white rounded-2xl shadow-2xl px-8 py-7 flex flex-col gap-4 min-w-[320px] max-w-sm"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Icon */}
//           <div class="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mx-auto">
//             <svg
//               class="w-6 h-6 text-emerald-600"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2.5"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           <div class="text-center">
//             <h3 class="text-lg font-semibold text-gray-800">
//               Record Saved Successfully
//             </h3>
//             <p class="text-sm text-gray-500 mt-1">
//               The game entry has been recorded.
//             </p>
//           </div>

//           {/* Raw data preview */}
//           <pre class="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 max-h-32 overflow-auto border border-gray-200">
//             {JSON.stringify(data, null, 2)}
//           </pre>

//           <button
//             onClick={onClose}
//             class="mt-1 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </Show>
//   );
// }

// // ── Tag pill ───────────────────────────────────────────────────────────────────
// function TagPill({ label, onRemove }: { label: string; onRemove: () => void }) {
//   return (
//     <span class="inline-flex items-center gap-1.5 bg-teal-700 text-white text-xs font-medium px-3 py-1.5 rounded-full">
//       {label}
//       <button
//         type="button"
//         onClick={onRemove}
//         class="hover:text-teal-200 transition-colors leading-none"
//         aria-label={`Remove ${label}`}
//       >
//         ×
//       </button>
//     </span>
//   );
// }

// // ── Main component ─────────────────────────────────────────────────────────────
// export default function AddAdminGames() {
//   type Game = {
//     title: string;
//     release: Date;
//     developers: string;
//     publishers: string;
//     description: string;
//     tags: string[];
//   };

//   const [game, setGame] = createStore<Game>({
//     title: "",
//     release: new Date(),
//     developers: "",
//     publishers: "",
//     description: "",
//     tags: [],
//   });

//   // Genre / tag pill state
//   const [tagInput, setTagInput] = createSignal("");

//   // File state
//   const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
//   let imageRef: HTMLInputElement | undefined;

//   // Response state
//   const [responseData, setResponseData] = createSignal<any>(null);
//   const [gotResponse, setGotResponse] = createSignal(false);
//   const [submitting, setSubmitting] = createSignal(false);
//   const [error, setError] = createSignal<string | null>(null);

//   // Description char count
//   const MAX_DESC = 2000;

//   const addTag = () => {
//     const val = tagInput().trim();
//     if (val && !game.tags.includes(val)) {
//       setGame("tags", [...game.tags, val]);
//     }
//     setTagInput("");
//   };

//   const removeTag = (tag: string) => {
//     setGame(
//       "tags",
//       game.tags.filter((t) => t !== tag),
//     );
//   };

//   const handleTagKeyDown = (
//     e: KeyboardEvent & { currentTarget: HTMLInputElement },
//   ) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       addTag();
//     }
//   };

//   const handleSubmit = async (e: SubmitEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSubmitting(true);

//     const adminEndpoint = import.meta.env.VITE_adminEndpoint;
//     try {
//       if (!checkAuthHeads()) {
//         throw new Error("Auth header not present");
//       }

//       const reqBody = {
//         ...unwrap(game),
//         developers: game.developers
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         publishers: game.publishers
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         tags: game.tags,
//         release: game.release.toISOString(),
//       };

//       // If an image was selected, send as FormData
//       if (selectedFile()) {
//         const formData = new FormData();
//         formData.append("image", selectedFile()!);
//         Object.entries(reqBody).forEach(([k, v]) =>
//           formData.append(k, Array.isArray(v) ? JSON.stringify(v) : String(v)),
//         );
//         const response = await axios.post(
//           adminEndpoint + "/addgame",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } },
//         );
//         if (response.data.Result === "success") {
//           setResponseData(response.data);
//           setGotResponse(true);
//         }
//       } else {
//         const response = await axios.post(adminEndpoint + "/addgame", reqBody);
//         if (response.data.Result === "success") {
//           setResponseData(response.data);
//           setGotResponse(true);
//         }
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.message ?? "Submission failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Shared input classes ───────────────────────────────────────────────────
//   const inputCls =
//     "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";

//   const labelCls =
//     "block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1.5";

//   return (
//     <>
//       <form
//         onSubmit={(e) => handleSubmit(e)}
//         class="flex flex-col gap-0 bg-gray-50 min-h-screen"
//       >
//         {/* ── Page header ── */}
//         <div class="px-10 pt-10 pb-6">
//           <p class="text-xs text-gray-400 mb-1">LIBRARY › GAMES › NEW ENTRY</p>
//           <h1 class="text-3xl font-bold text-gray-900">Add New Game</h1>
//           <p class="text-sm text-gray-500 mt-1">
//             Expand the catalog by adding a new game record. Ensure metadata
//             accuracy for editorial consistency.
//           </p>
//         </div>

//         <div class="px-10 pb-10 flex gap-6 items-start">
//           {/* ── Left column ── */}
//           <div class="flex flex-col gap-5 flex-1 min-w-0">
//             {/* Card 1 – Core metadata */}
//             <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-6 flex flex-col gap-5">
//               {/* Title */}
//               <div>
//                 <label class={labelCls}>Game Title</label>
//                 <input
//                   type="text"
//                   value={game.title}
//                   onInput={(e) => setGame("title", e.currentTarget.value)}
//                   class={inputCls}
//                   placeholder="e.g., Elden Ring"
//                 />
//               </div>

//               {/* Release + Developers row */}
//               <div class="flex gap-4">
//                 <div class="flex-1">
//                   <label class={labelCls}>Release Date</label>
//                   <div class="relative">
//                     <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//                       <svg
//                         class="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <rect x="3" y="4" width="18" height="18" rx="2" />
//                         <path d="M16 2v4M8 2v4M3 10h18" />
//                       </svg>
//                     </span>
//                     <input
//                       type="date"
//                       value={game.release.toISOString().split("T")[0]}
//                       onChange={(e) =>
//                         setGame("release", new Date(e.currentTarget.value))
//                       }
//                       class={`${inputCls} pl-10`}
//                     />
//                   </div>
//                 </div>

//                 <div class="flex-1">
//                   <label class={labelCls}>Developers (comma-separated)</label>
//                   <div class="relative">
//                     <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//                       <svg
//                         class="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <rect x="2" y="3" width="20" height="14" rx="2" />
//                         <path d="M8 21h8M12 17v4" />
//                       </svg>
//                     </span>
//                     <input
//                       type="text"
//                       value={game.developers}
//                       onInput={(e) =>
//                         setGame("developers", e.currentTarget.value)
//                       }
//                       class={`${inputCls} pl-10`}
//                       placeholder="e.g., FromSoftware, Valve"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Publishers */}
//               <div>
//                 <label class={labelCls}>Publishers (comma-separated)</label>
//                 <input
//                   type="text"
//                   value={game.publishers}
//                   onInput={(e) => setGame("publishers", e.currentTarget.value)}
//                   class={inputCls}
//                   placeholder="e.g., Bandai Namco, EA"
//                 />
//               </div>

//               {/* Genre/Tags */}
//               <div>
//                 <label class={labelCls}>Genre / Tags</label>
//                 <div class="border border-gray-200 rounded-xl bg-white px-4 py-3 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition">
//                   <For each={game.tags}>
//                     {(tag) => (
//                       <TagPill label={tag} onRemove={() => removeTag(tag)} />
//                     )}
//                   </For>
//                   <input
//                     type="text"
//                     value={tagInput()}
//                     onInput={(e) => setTagInput(e.currentTarget.value)}
//                     onKeyDown={handleTagKeyDown}
//                     onBlur={addTag}
//                     class="flex-1 min-w-[120px] outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
//                     placeholder="+ Add Genre (press Enter or comma)"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Card 2 – Description */}
//             <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-6">
//               <label class={labelCls}>Series Description</label>
//               <textarea
//                 rows={6}
//                 value={game.description}
//                 onInput={(e) => setGame("description", e.currentTarget.value)}
//                 class={`${inputCls} resize-y`}
//                 maxLength={MAX_DESC}
//                 placeholder="Write a brief overview of the plot, themes, and key features..."
//               />
//               <p class="text-right text-xs text-gray-400 mt-1.5">
//                 {game.description.length} / {MAX_DESC} characters
//               </p>
//             </div>

//             {/* Error message */}
//             <Show when={error()}>
//               <div class="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-sm text-red-600">
//                 {error()}
//               </div>
//             </Show>
//           </div>

//           {/* ── Right column ── */}
//           <div class="flex flex-col gap-5 w-72 flex-shrink-0">
//             {/* Cover Image */}
//             <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6">
//               <label class={labelCls}>Cover Image</label>
//               <label
//                 class="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl h-48 cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-colors group"
//                 aria-label="Upload cover image"
//               >
//                 <input
//                   ref={imageRef}
//                   type="file"
//                   name="image"
//                   accept="image/png,image/jpeg,image/webp"
//                   class="hidden"
//                   onChange={(e) => {
//                     const file = e.currentTarget.files?.[0] ?? null;
//                     setSelectedFile(file);
//                   }}
//                 />
//                 <Show
//                   when={!selectedFile()}
//                   fallback={
//                     <div class="flex flex-col items-center gap-2 px-4 text-center">
//                       <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
//                         <svg
//                           class="w-5 h-5 text-emerald-600"
//                           fill="none"
//                           stroke="currentColor"
//                           stroke-width="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                       </div>
//                       <p class="text-xs font-medium text-gray-700 break-all">
//                         {selectedFile()!.name}
//                       </p>
//                       <p class="text-xs text-gray-400">Click to change</p>
//                     </div>
//                   }
//                 >
//                   <div class="flex flex-col items-center gap-2 text-center">
//                     <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
//                       <svg
//                         class="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
//                         />
//                       </svg>
//                     </div>
//                     <p class="text-sm font-medium text-gray-700">
//                       Click to upload cover
//                     </p>
//                     <p class="text-xs text-gray-400">
//                       PNG, JPG or WEBP (Max 5MB)
//                     </p>
//                   </div>
//                 </Show>
//               </label>
//             </div>

//             {/* Production Stats */}
//             <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 flex flex-col gap-4">
//               <p class={labelCls}>Production Stats</p>

//               {/* Placeholder numeric stats – extend as needed */}
//               <div>
//                 <label class="text-xs text-gray-500 mb-1 block">
//                   Number of Developers Listed
//                 </label>
//                 <div class="flex items-center gap-3">
//                   <span class="text-xl font-semibold text-gray-800">
//                     {
//                       game.developers
//                         .split(",")
//                         .map((s) => s.trim())
//                         .filter(Boolean).length
//                     }
//                   </span>
//                   <span class="text-xs text-gray-400">Listed</span>
//                 </div>
//               </div>

//               <div>
//                 <label class="text-xs text-gray-500 mb-1 block">
//                   Tags Applied
//                 </label>
//                 <div class="flex items-center gap-3">
//                   <span class="text-xl font-semibold text-gray-800">
//                     {game.tags.length}
//                   </span>
//                   <span class="text-xs text-gray-400">Genres</span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <button
//               type="submit"
//               disabled={submitting()}
//               class="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-teal-700 text-white font-semibold text-sm hover:bg-teal-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
//             >
//               <Show
//                 when={!submitting()}
//                 fallback={
//                   <>
//                     <svg
//                       class="w-4 h-4 animate-spin"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         class="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         stroke-width="4"
//                       />
//                       <path
//                         class="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8H4z"
//                       />
//                     </svg>
//                     Saving...
//                   </>
//                 }
//               >
//                 <svg
//                   class="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2.5"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
//                   />
//                 </svg>
//                 Save Record
//               </Show>
//             </button>

//             <button
//               type="button"
//               class="w-full py-3.5 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-colors"
//               onClick={() => {
//                 setGame({
//                   title: "",
//                   release: new Date(),
//                   developers: "",
//                   publishers: "",
//                   description: "",
//                   tags: [],
//                 });
//                 setSelectedFile(null);
//                 setTagInput("");
//                 setError(null);
//                 if (imageRef) imageRef.value = "";
//               }}
//             >
//               Discard Draft
//             </button>

//             <p class="text-center text-xs text-gray-400">
//               AUTO-SAVED 2 MINS AGO
//             </p>
//           </div>
//         </div>
//       </form>

//       {/* Success popup */}
//       <PopUp
//         show={gotResponse()}
//         data={responseData()}
//         onClose={() => setGotResponse(false)}
//       />
//     </>
//   );
// }
