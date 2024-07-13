import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Particles from "react-particles";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
function App() {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    
    await loadSlim(engine);

    // tsParticles.load({
    //   id: "tsparticles",
    //   options: {
    //     particles: {
    //       shape: {
    //         type: "square", // starting from v2, this require the square shape script
    //       },
    //     },
    //     preset: "snow",
    //   },
    // });
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transprant",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#efb155",
            },
            links: {
              color: "#ffffff",
              distance: 300,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 10,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
            },
            zIndex: {
              value: -1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
            
          },
          detectRetina: true,
          preset: "snow",
        }}
      />

      <Header />
      <div className="pt-[4.5rem] pb-[4rem] max-w-[76rem] mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default App;
