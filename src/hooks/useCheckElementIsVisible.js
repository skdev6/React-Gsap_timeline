/* eslint-disable no-unused-vars */
import { debounce } from 'debounce'
import React, { useEffect, useState } from 'react'

export const useCheckElementIsVisible = targetRef => {
	const [ isInView, setIsInView ] = useState(false)

	useEffect(() => {
		const checkHandler = () => {
			setIsInView(prev => {
				if (!targetRef.current) {
					return prev
				}

				const rect = targetRef.current.getBoundingClientRect()

				return (
					(rect.top >= 0 && rect.top <= window.innerHeight) ||
          (rect.bottom >= 0 && rect.bottom < window.innerHeight)
				)
				// rect.left >= 0 &&
				// rect.bottom <= 0;
				// rect.right <= 0;

				// return r;
				// const r = bounding.top >= 0 && bounding.bottom <= window.innerHeight;

				// const parent = document.body;
				// const {
				//   top,
				//   bottom,
				//   height
				// } = targetRef.current.getBoundingClientRect();
				// const holderRect = parent.getBoundingClientRect();

				// const r =
				//   top <= holderRect.top
				//     ? holderRect.top - top <= height
				//     : bottom - holderRect.bottom <= height;

				// console.log(bounding);

				// return false;
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

	return isInView
}
