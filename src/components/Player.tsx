import { useRef, useState } from "react"
import * as THREE from "three"
import { Mesh } from "three"
import useKeyboard from "./hooks/useKeyboard"
import { useFrame } from "@react-three/fiber"
import {useStore} from "./hooks/useStore" 

export default function Player() {
	const SPEED = 4
	const JUMP_FORCE = 8
	const GRAVITY = -12

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
	
		// Sla bewegingen op basis van collisie tegen
		let moveX = 0
		let moveZ = 0
	
		// Horizontale beweging
		if (moveForward) moveZ -= SPEED * delta
		if (moveBackward) moveZ += SPEED * delta
		if (moveLeft) moveX -= SPEED * delta
		if (moveRight) moveX += SPEED * delta
	
		// Maak een tijdelijke positie voor de speler voor deze frame
		const tempPos = player.position.clone()
		tempPos.x += moveX
		tempPos.z += moveZ
	
		// Controleer of de speler botst met een cube
		for (const cube of cubes) {
			const cubePos = new THREE.Vector3(...cube.pos)
			const cubeSize = new THREE.Vector3(1, 1, 1) // standaard blok grootte
			const playerSize = new THREE.Vector3(0.8, 1.8, 0.5)
	
			if (isColliding(tempPos, playerSize, cubePos, cubeSize)) {
				// Horizontale collision (zie dat we alleen beweging stoppen op x en z)
				// Controleer of er een collision is op de X-as
				if (moveX !== 0) {
					// Als we naar links of rechts bewegen en botsen met een cube
					if (tempPos.x < cubePos.x) {
						moveX = 0 // Stop beweging naar links
					} else if (tempPos.x > cubePos.x) {
						moveX = 0 // Stop beweging naar rechts
					}
				}
	
				// Controleer of er een collision is op de Z-as
				if (moveZ !== 0) {
					// Als we naar voren of achter bewegen en botsen met een cube
					if (tempPos.z < cubePos.z) {
						moveZ = 0 // Stop beweging naar voren
					} else if (tempPos.z > cubePos.z) {
						moveZ = 0 // Stop beweging naar achteren
					}
				}
			}
		}
	
		// Pas de uiteindelijke positie van de speler aan op basis van de niet-gebroken beweging
		player.position.x += moveX
		player.position.z += moveZ
	
		// Zwaartekracht en springen (zoals eerder)
		velocity.current.y += GRAVITY * delta * 2
	
		if (jump && isOnGround) {
			velocity.current.y = JUMP_FORCE
			setIsOnGround(false)
		}
	
		player.position.y += velocity.current.y * delta
	
		// Check collision met elke cube voor springen
		const playerSize = new THREE.Vector3(0.8, 1.8, 0.5)
		const playerPos = player.position.clone()
	
		for (const cube of cubes) {
			const cubePos = new THREE.Vector3(...cube.pos)
			const cubeSize = new THREE.Vector3(1, 1, 1)
	
			if (isColliding(playerPos, playerSize, cubePos, cubeSize)) {
				// Simpele bovenop-check voor springen
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
	
		// Grond collision (zoals eerder)
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