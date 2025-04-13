import { CapsuleCollider, RigidBody, RigidBodyApi } from "@react-three/rapier"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useState } from "react"
import useKeyboard from "./hooks/useKeyboard"

const SPEED = 5
const JUMP_FORCE = 6

export default function Player() {
	const { camera } = useThree()
	const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard()
	const bodyRef = useRef<RigidBodyApi>(null!)
	const [canJump, setCanJump] = useState(true)

	useFrame(() => {
		const body = bodyRef.current
		if (!body) return

		const linvel = body.linvel()

		const direction = new THREE.Vector3()
		const front = new THREE.Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0))
		const side = new THREE.Vector3((moveRight ? 1 : 0) - (moveLeft ? 1 : 0), 0, 0)

		direction.addVectors(front, side)
			.normalize()
			.applyEuler(camera.rotation)
			.multiplyScalar(SPEED)

		body.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true)

		if (jump && canJump && Math.abs(linvel.y) < 0.05) {
			body.setLinvel({ x: linvel.x, y: JUMP_FORCE, z: linvel.z }, true)
			setCanJump(false)
		}

		const position = body.translation()
		camera.position.set(position.x, position.y + 0.9, position.z)
	})

	return (
		<RigidBody
			ref={bodyRef}
			colliders={false}
			mass={1}
			position={[0, 3, 0]}
			lockRotations
			onCollisionEnter={() => setCanJump(true)}
		>
			<CapsuleCollider args={[0.5, 0.5]} /> {/* radius, half height */}
		</RigidBody>
	)
}
