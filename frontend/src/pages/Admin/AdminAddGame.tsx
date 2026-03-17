import { createStore, unwrap } from "solid-js/store";
import { axiosWithAuth as axios, checkAuthHeads } from "../../configs/axios_conf";
import {  createEffect, createSignal } from "solid-js";

export default function AddAdminGames(){
    type Game ={
        title: string;
        release: Date;
        developers: string;
        publishers: string;
        description: string;
        tags: string;
    }
    // const [gameTitle,setGameTitle]=createSignal<string>("")
    // const [gameRelease,setGameRelease]=createSignal<Date>((new Date()))
    // const [gameDevelopers,setGameDevelopers]=createSignal<string>("")
    // const [gamePublishers,setGamePublishers]=createSignal<string>("")
    // const [gameDescription,setGameDescription]=createSignal<string>("")
    // const [gameTags,setGameTags]=createSignal<string>("")
    const [game,setGame]=createStore<Game>({
            title: "",
            release: (new Date()),
            developers: "",
            publishers: "",
            description: "",
            tags: ""
    })

    createEffect(()=>{
        console.log(game.title)
        console.log(game)
    })

    const updateStore=<K extends keyof Game>(field:K)=>(e:InputEvent&{
        currentTarget: HTMLInputElement|HTMLTextAreaElement;
        target: HTMLInputElement|HTMLTextAreaElement;
    })=>{
        let val:Game[K]
       
        val=e.target.value as Game[K]

        setGame(field,val)
    }
    let imageRef:HTMLInputElement|undefined
   
    const handleSubmit=async (e:SubmitEvent)=>{
        e.preventDefault()
        
        const adminEndpoint=import.meta.env.VITE_adminEndpoint
        try{
            if (!checkAuthHeads()){
                throw Error("Auth header not present")
            }
            const response=await axios.post(adminEndpoint+"/addgame",unwrap(game))
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <form
            onSubmit={(e)=>handleSubmit(e)}
            class="flex flex-col bg-gray-50 px-10 py-8 gap-5 max-w-2xl mx-auto rounded-xl shadow-sm border border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Add New Game</h1>

            {/* Title */}
            <div class="flex flex-col gap-1">
            <label class="font-medium text-gray-700">Game Title </label>
            <input
                type="text"
                name="title"
                value={game.title}
                onInput={ updateStore("title")}
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
                value={game.release.toISOString().split('T')[0]}
                onChange={(e)=>{
                    setGame("release",new Date(e.target.value))
                }}
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            {/* Developers */}
            <div class="flex flex-col gap-1">
            <label class="font-medium text-gray-700">Developers (comma seperated)</label>
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
            <label class="font-medium text-gray-700">Publishers (comma seperated)</label>
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
            <label class="font-medium text-gray-700">Tags (comma  separated)</label>
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
        </>
     ) 

}

