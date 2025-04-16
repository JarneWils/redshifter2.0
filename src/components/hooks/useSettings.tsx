import { createWithEqualityFn } from "zustand/traditional";

interface MeasurementsState {

	worldSize: number;
	setWorldSize: (newWorldSize: number) => void;

	cubeDistance: number;
	setCubeDistance: (newCubeDistance: number) => void;

}

const useMeasurements = createWithEqualityFn<MeasurementsState>((set) => ({
	// WORLD SIZE
	worldSize: 100,
	setWorldSize: (newWorldSize: number) => set({ worldSize: newWorldSize }),

	// CUBE DISTANCE
	cubeDistance: 3,
	setCubeDistance: (newCubeDistance: number) => set({ cubeDistance: newCubeDistance }),
}));

export default useMeasurements;
