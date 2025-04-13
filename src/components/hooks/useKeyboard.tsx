import { useCallback, useEffect, useState } from "react"

function actionByKey(key: string) {
	const keyActionMap = {
		KeyW: "moveForward",
		KeyS: "moveBackward",
		KeyA: "moveLeft",
		KeyD: "moveRight",
		rightClick: "textureSwitch",
		Space: "jump",
	}

	return keyActionMap[key as keyof typeof keyActionMap]
}

export default function useKeyboard() {

	const [actions, setActions] = useState({
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		jump: false,
		texture1: false,
		texture2: false,
		texture3: false,
	})

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		const action = actionByKey(e.code)
		if (action) {
			setActions((prev) => {
				return {
					...prev,
					[action]: true
				}
			})
		}
	}, [])

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		const action = actionByKey(e.code)
		if (action) {
			setActions((prev) => {
				return {
					...prev,
					[action]: false
				}
			})
		}
	}, [])

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown)
		document.addEventListener("keyup", handleKeyUp)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("keyup", handleKeyUp)
		}
	}, [handleKeyDown, handleKeyUp])
	
	
	return actions
}
