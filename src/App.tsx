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
      <div className="w-full h-full text-[#96a4b2]">
        <div className="flex h-screen bg-gradient-to-b from-[#0f161c] to-[#212b35] text-gray-100 font-sans">
          {/* Sidebar */}
          <aside className="w-18 bg-[#0f161c] flex flex-col items-center space-y-6 shadow-md border-r-2 border-[#1e343f]">
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(250,250,250,0.4)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <SlScreenDesktop
                fill="#ffffff"
                className="w-full h-1/2 fill-[#9eabb7] text-white transition-all duration-500"
              />
            </button>
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(250,250,250,0.4)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <MdOutlineWallpaper
                fill="#ffffff"
                className="w-full h-1/2 fill-[#9eabb7] text-white transition-all duration-500"
              />
            </button>
            <button className="hover:[&_svg]:scale-110 hover:bg-[rgba(250,250,250,0.4)] transition-all duration-500 w-[50px] aspect-square m-2 rounded-lg bg-[rgba(200,200,200,0.1)] cursor-pointer">
              <CgToolbarTop
                fill="#ffffff"
                className="w-full h-1/2 fill-[#9eabb7] text-[#9eabb7] transition-all duration-500"
              />
            </button>
          </aside>

          {/* Main content */}
          <div className="flex-1 pt-[90px] pb-4 pl-4 pr-4 relative">
            <div className="absolute h-[68px] w-full left-0 top-0 bg-[radial-gradient(circle_at_top_left,_#2f3554,_#2f4542)] pb-[1px]">
              <div className="bg-[#1e222c] h-[67px] p-4">
                <h1 className="text-2xl text-[#96a4b2] mb-4">Display</h1>
              </div>
            </div>
            {/* settings containers */}
            <div className="rounded-2xl shadow-lg bg-[radial-gradient(circle_at_top_left,_#2f5655,_#2f6752)] p-[1px]">
              <div className="rounded-2xl bg-[#1e222c] p-6">
                <h1 className="text-xl text-[#96a4b2] mb-4">Monitors</h1>
                <p className="text-[#96a4b2]">2560x1440 @ 60Hz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
