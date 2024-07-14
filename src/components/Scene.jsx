import { Canvas } from "@react-three/fiber";
import Model from "./Model";
// import { OrbitControls } from "@react-three/drei";

const Scene = ({ activeProject }) => {
  return (
    <div className="fixed h-screen w-full">
      <Canvas>
        {/* <OrbitControls /> */}
        <Model activeProject={activeProject} />
      </Canvas>
    </div>
  );
};

export default Scene;
