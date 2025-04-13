import { RigidBody } from "@react-three/rapier"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function Ground() {
	const groundTexture = useTexture("/images/grass-top.jpg")
	groundTexture.magFilter = THREE.NearestFilter
	groundTexture.wrapS = THREE.RepeatWrapping
	groundTexture.wrapT = THREE.RepeatWrapping
	groundTexture.repeat.set(100, 100)

	return (
		<RigidBody type="fixed" position={[0, -0.5, 0]}>
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[100, 100]} />
				<meshStandardMaterial map={groundTexture} side={THREE.DoubleSide}/>
			</mesh>
		</RigidBody>
	)
}
