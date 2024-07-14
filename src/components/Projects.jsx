import { projects } from "../app/data";

export default function Projects({ setActiveProject }) {
  return (
    <div className="relative mix-blend-difference z-10 text-white h-screen w-full">
      <ul
        className="border-b"
        onMouseLeave={() => {
          setActiveProject(null);
        }}
      >
        {projects.map((project, i) => {
          return (
            <li
              key={project.title}
              onMouseOver={() => {
                setActiveProject(i);
              }}
              className="text-[4vw] p-5 border-t"
            >
              <p>{project.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
