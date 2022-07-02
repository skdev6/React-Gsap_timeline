import { useLayoutEffect, useState } from 'react'

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
	if (!isBrowser) return { x: 0, y: 0 }

	const target = element ? element.current : document.body
	const position = target.getBoundingClientRect()

	return useWindow
		? { x: window.scrollX, y: window.scrollY }
		: { x: position.left, y: position.top }
}

export function useScrollPosition(deps, element, useWindow, wait) {
	const [ position, setPosition ] = useState(getScrollPosition({ useWindow }))
	// const

	let throttleTimeout = null

	const callBack = () => {
		const currPos = getScrollPosition({ element, useWindow })
		// effect({ prevPos: position.current, currPos });
		// position.current = currPos;
		setPosition(currPos)
		throttleTimeout = null
	}

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					throttleTimeout = setTimeout(callBack, wait)
				}
			} else {
				callBack()
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, deps)

	return position
}
