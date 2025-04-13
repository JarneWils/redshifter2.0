// import { Sky } from "@react-three/drei";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";

export default function Scene() {
	return (
		<>
			{/* <Sky sunPosition={[100, 100, 20]} /> */}
			<color attach="background" args={["rgb(10,25,50)"]} />
			<fog attach="fog" args={["rgb(10,25,50)", 5, 40]} />

			<ambientLight intensity={0.7} />
			<directionalLight
				position={[0, 150, 0]}
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
				position={[100, 100, 100]}
				intensity={0.8}
				castShadow
				shadow-mapSize={[512, 512]}
				shadow-camera-near={1}
				shadow-camera-far={200}
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
