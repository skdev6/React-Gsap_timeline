import { useEffect, useState } from 'react'
import { debounce } from 'debounce'

export function useContainerDimensions(targetRef) {
	const [ dimensions, setDimensions ] = useState({
		width: 0,
		// height: 0,
		updated: false
	})

	useEffect(() => {
		const onResizeHandler = () => {
			setDimensions(prev => {
				if (!targetRef.current) {
					return prev
				}

				const next = {
					width: targetRef.current.offsetWidth,
					height: targetRef.current.offsetHeight,
					updated: true
				}

				// If nothing changed return prev!
				if (
					prev.height === next.height &&
          prev.width === next.width &&
          next.updated === true
				) {
					return prev
				}

				return next
			})
		}

		onResizeHandler()

		window.addEventListener('resize', debounce(onResizeHandler, 250))

		return () => {
			window.removeEventListener('resize', onResizeHandler)
		}
	}, [ targetRef ])

	return dimensions
}
