import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function Ground() {
	const groundTexture = useTexture("/images/grass-top.jpg")
	groundTexture.magFilter = THREE.NearestFilter
	groundTexture.wrapS = THREE.RepeatWrapping
	groundTexture.wrapT = THREE.RepeatWrapping
	groundTexture.repeat.set(100, 100)

	const groundGeometry = new THREE.BoxGeometry(100, 1, 100)

	return (
		<mesh
		receiveShadow
		rotation={[0, 0, 0]}
		position={[0, -1, 0]}
		geometry={groundGeometry}
		><meshStandardMaterial map={groundTexture} side={THREE.DoubleSide}/></mesh>
	)
}
