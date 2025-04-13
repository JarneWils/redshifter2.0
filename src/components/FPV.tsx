import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

export default function FPV() {
	const { camera, gl } = useThree()

	useEffect(() => {
		const canvas = gl.domElement

		const handleClick = () => {
			canvas.requestPointerLock()
		}

		canvas.addEventListener("click", handleClick)

		return () => {
			canvas.removeEventListener("click", handleClick)
		}
	}, [gl])

	return <PointerLockControls camera={camera} />
}
