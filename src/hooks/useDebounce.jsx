import React, { useEffect, useCallback } from "react"

const useDebounce = (effect, dependency, delay = 200) => {
	const callback = useCallback(effect, dependency)

	useEffect(() => {
		const timeout = setTimeout(callback, delay)
		return () => clearTimeout(timeout)
	}, [callback, delay])
}

export default useDebounce
