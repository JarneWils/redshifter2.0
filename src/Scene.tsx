// import { Sky } from "@react-three/drei";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";

export default function Scene() {
	return (
		<>
			{/* <Sky sunPosition={[100, 100, 20]} /> */}
			<color attach="background" args={["rgb(14, 27, 49)"]} />
			<fog attach="fog" args={["rgb(14,27,49)", 1, 40]} />

			<ambientLight intensity={1} />
			<directionalLight
				position={[-100, 50, -100]}
				intensity={0.5}
				shadow-mapSize={[512, 512]}
				shadow-camera-near={1}
				shadow-camera-far={200}
				shadow-camera-left={-50}
				shadow-camera-right={50}
				shadow-camera-top={50}
				shadow-camera-bottom={-50}
			/>
			<directionalLight
				position={[100, 150, 100]}
				intensity={1.2}
				castShadow
				shadow-mapSize={[512, 512]}
				shadow-camera-near={1}
				shadow-camera-far={300}
				shadow-camera-left={-50}
				shadow-camera-right={50}
				shadow-camera-top={50}
				shadow-camera-bottom={-50}
			/>
			<FPV />
			<Player />
			<Cubes />
			<Ground />
		</>
	)
}
