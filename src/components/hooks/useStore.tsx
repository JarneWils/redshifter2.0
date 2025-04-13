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
}

export const useStore = create<State>((set) => ({

	cubes:[{
			key: nanoid(),
			pos: [-1,0,0],
			texture: 'grass-side',
		},
		{
			key: nanoid(),
			pos: [0,0,0],
			texture: 'dirtBlock',
		},
		{
			key: nanoid(),
			pos: [1,0,0],
			texture: 'amoBlock',
		},
		{
			key: nanoid(),
			pos: [2,0,0],
			texture: 'healtBlock',
		}
	],
	texture:'grass-side',

	addCube: (x:number, y:number, z:number) => {
		set((prev) => ({
			cubes: [
				...prev.cubes,
				{
					key: nanoid(),
					pos: [x,y,z],
					texture: prev.texture,
				}
			],
		}))
	},

	removeCube: () => {},

	setTexture: () => {},
}))
