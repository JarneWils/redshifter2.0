import { usePlane } from "@react-three/cannon"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
export default function Ground() {

	const groundTexture = useTexture("/images/grass-top.jpg")
	groundTexture.magFilter = THREE.NearestFilter
	groundTexture.wrapS = THREE.RepeatWrapping
	groundTexture.wrapT = THREE.RepeatWrapping
	groundTexture.repeat.set(100, 100)

	const [refPlane] = usePlane(() => ({
		position: [0, -0.5, 0],
		rotation: [-Math.PI / 2, 0, 0],
	}))
	return (
		<mesh ref={refPlane}
		receiveShadow
		>
			<planeGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial map={groundTexture} />
		</mesh>
	)
}
