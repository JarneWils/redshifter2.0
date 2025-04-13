import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"


export default function FPV() {
	const {camera} = useThree()

	return (
		<PointerLockControls camera={camera}/>
	)
}
