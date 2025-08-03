import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./index.css";

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
    <main className="container">
      <div className="">
        <h1 className="font-bold mb-4">Hyprland Config testing</h1>
        <pre>{config}</pre>
      </div>
    </main>
  );
}

export default App;
