import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

type CubeProps = {
	position: [number, number, number]
	texture: string
}

export default function Cube({ position, texture }: CubeProps) {
	const colorMap = useLoader(THREE.TextureLoader, `/images/${texture}.jpg`)
	colorMap.magFilter = THREE.NearestFilter

	return (
		<mesh castShadow receiveShadow position={position}>
			<boxGeometry />
			<meshStandardMaterial map={colorMap} />
		</mesh>
	)
}
