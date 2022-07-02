/* eslint-disable no-unused-vars */
import { debounce } from 'debounce'
import React, { useLayoutEffect, useState } from 'react'

export const useGetElementBoundingRect = targetRef => {
	const [ rect, setRect ] = useState()

	useLayoutEffect(() => {
		const checkHandler = () => {
			setRect(prev => {
				if (!targetRef.current) {
					return prev
				}

				return targetRef.current.getBoundingClientRect()
			})
		}

		checkHandler()

		window.addEventListener('scroll', checkHandler)

		window.addEventListener('resize', debounce(checkHandler, 250))

		return () => {
			window.removeEventListener('scroll', checkHandler)
			window.removeEventListener('resize', checkHandler)
		}
	}, [ targetRef ])

	return rect
}
