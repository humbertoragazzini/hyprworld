import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./index.css";
import { SlScreenDesktop } from "react-icons/sl";
import { MdOutlineWallpaper } from "react-icons/md";
import { CgToolbarTop } from "react-icons/cg";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  const [config, setConfig] = useState("Loading...");

  useEffect(() => {
    invoke<string>("read_hypr_config")
      .then(setConfig)
      .catch((err) => setConfig(`Error: ${err}`));
  }, []);

  return (
    <main className=" w-full h-screen flex justify-center items-center">
      <div className="bg-gray-700 w-full h-full text-white">
        <div className="flex h-screen bg-[#2f3541] text-gray-100 font-sans">
          {/* Sidebar */}
          <aside className="w-16 bg-[#1e222c] flex flex-col items-center py-4 space-y-6 shadow-md">
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(0,0,0,0.2)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <SlScreenDesktop
                fill="#ffffff"
                className="w-full h-1/2 fill-white text-white transition-all duration-500"
              />
            </button>
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(0,0,0,0.2)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <MdOutlineWallpaper
                fill="#ffffff"
                className="w-full h-1/2 fill-white text-white transition-all duration-500"
              />
            </button>
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(0,0,0,0.2)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <CgToolbarTop
                fill="#ffffff"
                className="w-full h-1/2 fill-white text-white transition-all duration-500"
              />
            </button>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6">
            {/* settings containers */}
            <div className="bg-[#1e222c] rounded-2xl p-6 shadow-lg border border-white/5"></div>
          </main>
        </div>
      </div>
    </main>
  );
}

export default App;
