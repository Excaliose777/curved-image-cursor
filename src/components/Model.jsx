/* eslint-disable react/no-unknown-property */

import { animate, progress, useMotionValue, useTransform } from "framer-motion";
import useMouse from "../app/useMouse";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
// import { MathUtils } from "three";
import { fragment, vertex } from "../app/shader";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { projects } from "../app/data";

const Model = ({ activeProject }) => {
  const mesh = useRef();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  const { viewport } = useThree();
  const textures = projects.map((project) => useTexture(project.src));
  // const texture = useTexture("/images/1.jpg");
  const scale = useAspect(
    textures[0].image.width,
    textures[0].image.height,
    0.232
  );

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const uniforms = useRef({
    uTexture: { value: textures[0] },
    uDelta: { value: { x: 0, y: 0 } },
    uOpacity: { value: 1 },
  });

  useEffect(() => {
    if (activeProject != null) {
      animate(opacity, 1, {
        duration: 0.2,
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });

      mesh.current.material.uniforms.uTexture.value = textures[activeProject];
    } else {
      animate(opacity, 0, {
        duration: 0.2,
        onUpdate: (progress) =>
          (mesh.current.material.uniforms.uOpacity.value = progress),
      });
      mesh.current.material.uniforms.uOpacity.value = 0;
    }
  }, [activeProject]);

  const lerp = (x, y, a) => x * (1 - a) + y * a;
  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();
    smoothMouse.x.set(lerp(smoothX, x.get(), 0.1));
    smoothMouse.y.set(lerp(smoothY, y.get(), 0.1));
    // smoothMouse.x.set(MathUtils.lerp(smoothMouse.x.get(), x.get(), 0.1));
    // smoothMouse.y.set(MathUtils.lerp(smoothMouse.y.get(), y.get(), 0.1));

    mesh.current.material.uniforms.uDelta.value = {
      x: x.get() - smoothX,
      y: -1 * (y.get() - smoothY),
    };
  });

  //Math.Map is possible for use instead of useTransform
  const x = useTransform(
    smoothMouse.x,
    [0, window.innerWidth],
    [(-1 * viewport.width) / 2, viewport.width / 2]
  );

  const y = useTransform(
    smoothMouse.y,
    [0, window.innerHeight],
    [viewport.height / 2, (-1 * viewport.height) / 2]
  );

  return (
    <motion.mesh scale={scale} ref={mesh} position-x={x} position-y={y}>
      <planeGeometry args={[1, 1, 15, 15]} />
      {/* <meshBasicMaterial wireframe={true} color={"red"} /> */}
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
        transparent={true}
      />
    </motion.mesh>
  );
};

export default Model;
