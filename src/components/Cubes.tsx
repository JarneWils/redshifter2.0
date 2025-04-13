import Cube from "./Cube"
import { useStore } from "./hooks/useStore"
export default function Cubes() {

	const cubes = useStore((state) => state.cubes)


	return cubes.map(({key, pos, texture}) => {
		return(
			<Cube key={key} position={pos} texture={texture}/>
		)
	})
}