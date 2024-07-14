import "./App.css";
import "./index.css";
import Projects from "./components/Projects";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Scene from "./components/Scene";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const [activeProject, setActiveProject] = useState(null);
  return (
    <main>
      <Scene activeProject={activeProject} />
      <div className="h-[50vh]"></div>
      <Projects setActiveProject={setActiveProject} />
      <div className="h-[50vh]"></div>
    </main>
  );
}

export default App;
