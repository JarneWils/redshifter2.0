// useStore.ts (let op: niet .tsx als er geen JSX in zit!)
import { create } from "zustand"
import { nanoid } from "nanoid"

type Cube = {
	key: string
	pos: [number, number, number]
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
	cubes: [],

	addCube: (x, y, z) => {
		set((prev) => ({
			cubes: [
				...prev.cubes,
				{
					key: nanoid(),
					pos: [x, y, z],
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
