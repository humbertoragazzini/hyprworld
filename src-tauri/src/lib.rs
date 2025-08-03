// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


#[tauri::command]
fn read_hypr_config() -> Result<String, String> {
    let path = dirs::home_dir()
        .map(|home| home.join(".config/hypr/hyprland.conf"))
        .ok_or("Could not find home directory")?;

    std::fs::read_to_string(path).map_err(|e| e.to_string())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet,read_hypr_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
