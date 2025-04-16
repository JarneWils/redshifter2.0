import { create } from "zustand"
import { nanoid } from "nanoid"

type Cube = {
	key: string
	pos: [number, number, number] // Tuple van exact 3 getallen
	texture: string
}

type State = {
	cubes: Cube[]
	texture: string
	addCube: (x: number, y: number, z: number) => void
	removeCube: (x: number, y: number, z: number) => void
	setTexture: (texture: string) => void
}

export const useStore = create<State>((set) => ({
	
	texture: 'grass-side',
	cubes: Array.from({ length: 30 }, (_, y) =>
		Array.from({ length: 30 }, (_, x) => ({
			key: nanoid(),
			pos: [x - 15, -1, y - 15] as [number, number, number], // Zorg ervoor dat pos altijd een tuple is
			texture: 'grass-top',
		}))
	).flat(),

	addCube: (x, y, z) => {
		set((prev) => ({
			cubes: [
				...prev.cubes,
				{
					key: nanoid(),
					pos: [x, y, z] as [number, number, number], // Tuple van 3 getallen
					texture: prev.texture,
				},
			],
		}))
	},

	removeCube: (x, y, z) => {
		set((prev) => ({
			cubes: prev.cubes.filter(
				(cube) => cube.pos[0] !== x || cube.pos[1] !== y || cube.pos[2] !== z
			),
		}))
	},

	setTexture: (texture) => set(() => ({ texture })),
}))
