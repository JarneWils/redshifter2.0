import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { useStore } from './hooks/useStore.tsx'

type CubeProps = {
	position: [number, number, number]
	texture: string
}

export default function Cube({ position, texture }: CubeProps) {
	const colorMap = useLoader(THREE.TextureLoader, `/images/${texture}.jpg`)
	colorMap.magFilter = THREE.NearestFilter

	
	const addCube = useStore((state) => state.addCube)
	const removeCube = useStore((state) => state.removeCube)


	return (
		<mesh
		onClick={(e) => {
			e.stopPropagation()
			e.nativeEvent.preventDefault();
			const clickedFace = e.faceIndex ? Math.floor(e.faceIndex / 2) : null
			const [x, y, z] = position

			if (e.button === 2) {
				// Rechtermuisknop = verwijderen
				removeCube(x, y, z)
				return
			}

			// Linkermuisknop = toevoegen
			if (clickedFace === 0) {
				addCube(x + 1, y, z)
			} else if (clickedFace === 1) {
				addCube(x - 1, y, z)
			} else if (clickedFace === 2) {
				addCube(x, y + 1, z)
			} else if (clickedFace === 3) {
				addCube(x, y - 1, z)
			} else if (clickedFace === 4) {
				addCube(x, y, z + 1)
			} else if (clickedFace === 5) {
				addCube(x, y, z - 1)
			}
		}}

		castShadow
		receiveShadow
		position={position}
	>
		<boxGeometry />
		<meshStandardMaterial map={colorMap} />
	</mesh>

	)
}
