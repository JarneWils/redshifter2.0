import { useBox } from "@react-three/cannon"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"

type CubeProps = {
	position: [number, number, number]
	texture: string
}

export default function Cube({ position: [x, y, z], texture }: CubeProps) {
	const [ref] = useBox(() => ({
		type: "Static",
		position: [x, y, z],
	}))

	// Laad de textuur
	const colorMap = useLoader(THREE.TextureLoader, `/images/${texture}.jpg`)
	colorMap.magFilter = THREE.NearestFilter

	return (
		<mesh ref={ref}
		castShadow
		receiveShadow
		>
			<boxGeometry />
			<meshStandardMaterial map={colorMap} />
		</mesh>
	)
}
