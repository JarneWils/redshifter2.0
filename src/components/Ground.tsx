import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { useStore } from './hooks/useStore.tsx'

export default function Ground() {
	const groundTexture = useTexture("/images/grass-top.jpg")
	groundTexture.magFilter = THREE.NearestFilter
	groundTexture.wrapS = THREE.RepeatWrapping
	groundTexture.wrapT = THREE.RepeatWrapping
	groundTexture.repeat.set(100, 100)

	const groundGeometry = new THREE.BoxGeometry(100, 1, 100)
	const addCube = useStore((state) => state.addCube)

	return (
		<mesh
			onPointerDown={(e) => {
				e.stopPropagation()
				e.nativeEvent.preventDefault()

				if (e.button === 0) {
					const [x, y, z] = Object.values(e.point).map((val) => Math.floor(val)) as [number, number, number]
					addCube(x, y + 1, z)
				}
			}}
			receiveShadow
			rotation={[0, 0, 0]}
			position={[0, -1, 0]}
			geometry={groundGeometry}
		>
			<meshStandardMaterial map={groundTexture} side={THREE.DoubleSide} />
		</mesh>
	)
}
