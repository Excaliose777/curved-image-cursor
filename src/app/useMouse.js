// import React, { useEffect, useState } from "react";

// export default function useMouse() {
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });

//   const mouseMove = (e) => {
//     const { clientX, clientY } = e;
//     setMouse({
//       x: clientX,
//       y: clientY,
//     });
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", mouseMove);
//     return () => window.removeEventListener("mousemove", mouseMove);
//   }, []);

//   return mouse;
// }

import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function useMouse() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return mouse;
}
