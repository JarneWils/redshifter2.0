import { Physics } from "@react-three/rapier";
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

			<ambientLight intensity={1} />
			<directionalLight position={[200, 100, -200]} intensity={1} castShadow/>
			<Physics gravity={[0, -15, 0]}>
				<FPV />
				<Player />
				<Cubes />
				<Ground />
			</Physics>
		</>
	)
}
