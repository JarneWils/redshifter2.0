import { useRef, useState } from "react"
import * as THREE from "three"
import { Mesh } from "three"
import useKeyboard from "./hooks/useKeyboard"
import { useFrame, useThree } from "@react-three/fiber"
import { useStore } from "./hooks/useStore"

export default function Player() {
	const SPEED = 4
	const JUMP_FORCE = 8
	const GRAVITY = -12

	const { camera } = useThree()
	const cubes = useStore((state) => state.cubes)

	function isColliding(posA: THREE.Vector3, sizeA: THREE.Vector3, posB: THREE.Vector3, sizeB: THREE.Vector3) {
		return (
			Math.abs(posA.x - posB.x) < (sizeA.x / 2 + sizeB.x / 2) &&
			Math.abs(posA.y - posB.y) < (sizeA.y / 2 + sizeB.y / 2) &&
			Math.abs(posA.z - posB.z) < (sizeA.z / 2 + sizeB.z / 2)
		)
	}

	const playerGeometrie = new THREE.BoxGeometry(0.8, 1.8, 0.5)
	const playerMaterial = new THREE.MeshStandardMaterial({ color: "red" })
	const bodyRef = useRef<Mesh>(null!)

	const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard()

	const velocity = useRef(new THREE.Vector3(0, 0, 0))
	const [isOnGround, setIsOnGround] = useState(true)

	useFrame((_, delta) => {
		const player = bodyRef.current

		// Zet de camera op de positie van de speler (ogen iets hoger)
		camera.position.copy(player.position)
		camera.position.y += 0.6

		// Haal richting van camera
		const direction = new THREE.Vector3()
		const frontVector = new THREE.Vector3(
			(moveForward ? 1 : 0) - (moveBackward ? 1 : 0),
			0,
			(moveRight ? 1 : 0) - (moveLeft ? 1 : 0)
		)
		frontVector.normalize()

		camera.getWorldDirection(direction)
		direction.y = 0
		direction.normalize()

		const right = new THREE.Vector3()
		right.crossVectors(direction, camera.up).normalize()

		const moveDir = new THREE.Vector3()
		moveDir.addScaledVector(direction, frontVector.x)
		moveDir.addScaledVector(right, frontVector.z)
		moveDir.normalize()

		let moveX = moveDir.x * SPEED * delta
		let moveZ = moveDir.z * SPEED * delta

		// Maak een tijdelijke positie voor de speler voor deze frame
		const tempPos = player.position.clone()
		tempPos.x += moveX
		tempPos.z += moveZ

		// Collision detection voor X/Z beweging
		let hasJumpedThisFrame = false

		for (const cube of cubes) {
			const cubePos = new THREE.Vector3(...cube.pos)
			const cubeSize = new THREE.Vector3(1, 1, 1)
			const playerSize = new THREE.Vector3(0.8, 1.8, 0.5)

			// Controleer of de speler botst met de cube
			if (isColliding(tempPos, playerSize, cubePos, cubeSize)) {
				// Bereken de onderkant van de speler en de bovenkant van de cube
				const playerBottom = player.position.y - playerSize.y / 2
				const cubeTop = cubePos.y + cubeSize.y / 2

				// Alleen springen als de cube zich tussen de voeten en kniehoogte bevindt (max 0.4 boven de voeten)
				const isStepHeight = cubeTop >= playerBottom - 0.1 && cubeTop <= playerBottom + 0.4

				if (moveX !== 0 || moveZ !== 0) {
					if (isStepHeight && isOnGround && !hasJumpedThisFrame) {
						// Auto-jump als de cube een 'stap' is
						velocity.current.y = JUMP_FORCE - 2
						setIsOnGround(false)
						hasJumpedThisFrame = true
					}
					if (moveX !== 0) moveX = 0
					if (moveZ !== 0) moveZ = 0
				}
			}
		}

		// Beweging toepassen
		player.position.x += moveX
		player.position.z += moveZ

		// Zwaartekracht & springen
		velocity.current.y += GRAVITY * delta * 2

		if (jump && isOnGround) {
			velocity.current.y = JUMP_FORCE
			setIsOnGround(false)
		}

		player.position.y += velocity.current.y * delta

		// Y-collision detection (platforms)
		const playerSize = new THREE.Vector3(0.8, 1.8, 0.5)
		const playerPos = player.position.clone()

		for (const cube of cubes) {
			const cubePos = new THREE.Vector3(...cube.pos)
			const cubeSize = new THREE.Vector3(1, 1, 1)

			// Controleer of de speler botst met de cube op Y-as
			if (isColliding(playerPos, playerSize, cubePos, cubeSize)) {
				const isFalling = velocity.current.y < 0
				const playerBottom = playerPos.y - playerSize.y / 2
				const cubeTop = cubePos.y + cubeSize.y / 2

				if (isFalling && playerBottom <= cubeTop + 0.1 && playerBottom >= cubeTop - 0.3) {
					player.position.y = cubeTop + playerSize.y / 2
					velocity.current.y = 0
					setIsOnGround(true)
				}
			}
		}

		// Collision met grondvlak
		if (player.position.y <= 0.5) {
			player.position.y = 0.5
			velocity.current.y = 0
			setIsOnGround(true)
		}
	})

	return (
		<mesh
			ref={bodyRef}
			position={[0, 1, 0]}
			geometry={playerGeometrie}
			material={playerMaterial}
		/>
	)
}
