import { useState } from "react";
import { Background } from "./Components/Background";
import { Foreground } from "./Components/Foreground";

export default function App() {
    const [dtheme,setTheme] = useState(true)

    function changeTheme() {
        if (dtheme) {
            setTheme(false)
        }
        else {
            setTheme(true)
        }
    }
    return (
        <div className={ `min-h-screen ${dtheme ?'bg-slate-950':'bg-white'} absolute top-0 left-0 -z-10 transition duration-300`}>
            <Background theme={dtheme} />
            <Foreground dtheme={dtheme} changeTheme={changeTheme}/>
            
        </div>
    );
}