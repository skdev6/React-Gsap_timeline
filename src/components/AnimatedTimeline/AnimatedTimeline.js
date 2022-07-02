/* eslint-disable no-undefined */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
// import { number, string, array } from 'prop-types'
import React, { useMemo, useRef } from 'react'
import { useGetElementBoundingRect } from '../../hooks/useGetElementBoundingRect'
import { useScrollPosition } from '../../hooks/useScrollPositions'
import ParallaxItem from '../AnimatedTimelineItem/AnimatedTimelineItem'
import styles from './AnimatedTimeline.module.scss'

// function easeOutExpo(t, b, c, d) {
//   return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
// }

const AnimatedTimeline = ({
	title,
	breadcrumb,
	description,
	items,
	speed = 0.6,
	...props
}) => {
	const containerRef = useRef()
	const containerHeight = window.innerHeight
	const scroll = useScrollPosition([containerHeight])

	const rect = useGetElementBoundingRect(containerRef)
	const scrolled = scroll.y * -1
	const maxHeight = (items.length * containerHeight) / speed

	const scrollAtOffset = useRef()
	const progress = useMemo(() => {
		if (rect?.top > 0) {
			scrollAtOffset.current = undefined
			return -1
		}

		if (!scrollAtOffset.current) {
			scrollAtOffset.current = scrolled
		}

		return scrolled === 0 ? 0 : (scrolled - scrollAtOffset.current) / maxHeight
	}, [rect, scrolled, maxHeight])

	const itemsCalculatedProgresses = useMemo(() => {
		if (progress === -1) {
			return items.reduce((accum, _, i) => {
				const isFirst = i === 0

				return {
					...accum,
					[i]: isFirst
						? {
							// Show the first slide open by default!
							progress: 1,
							isActive: false
						}
						: {
							progress: 0,
							isActive: false
						}
				}
			}, {})
		}

		const ratio = 1 / items.length

		const currentItem =
			Math.floor(progress / ratio) === items.length
				? items.length - 1
				: Math.floor(progress / ratio)

		return items.reduce((accum, _, i) => {
			const isCurrent = currentItem === i

			if (!isCurrent) {
				return {
					...accum,
					[i]: {
						progress: accum[i]?.progress || 0,
						isActive: accum[i]?.isActive || false
					}
				}
			}
			const isLast = i === items.length - 1
			const itemProgress = (progress - ratio * i) / ratio
			const itemProgressAtCurrentIndex = isCurrent ? 1 - itemProgress : 0
			const itemProgressAtFollowingIndex = isCurrent ? itemProgress : 0

			const isCurrentActive =
				itemProgressAtCurrentIndex >= itemProgressAtFollowingIndex

			return {
				...accum,
				[i]: {
					progress: itemProgressAtCurrentIndex,
					isActive: isCurrentActive
				},
				...(!isLast && {
					[i + 1]: {
						progress: itemProgressAtFollowingIndex,
						isActive: !isCurrentActive
					}
				})
			}
		}, {})
	}, [items, progress])

	// console.log(
	//   "progress",
	//   progress,
	//   Object.values(itemsCalculatedProgresses).map(
	//     (p, i) => `${i} > ${p.progress}`
	//   )
	// );

	return (
		<div
			style={{
				noHeight: maxHeight,
				scrollSnapType: 'y mandatory',
				scrollPaddingTop: '15vh'
			}}>
			{items.map((_, i) => (
				<div
					key={`buffer-${i}`}
					style={{
						height: containerHeight / speed,
						scrollSnapStop: 'always',
						scrollSnapAlign: 'center'
					}} />
			))}
			<div
				className={`${styles.parallaxContainer} ${props.contentClassName}`}
				ref={containerRef}
				style={{
					height: containerHeight,
					// As long as the progress is happening the position is fixed!
					...(progress > 0 &&
						progress < 1 && {
						position: 'sticky'
					})
				}}>
				<div className={styles.introContainer}>
					<p className={styles.documentBreadcrumb}>{breadcrumb}</p>
					<h2 className={styles.documentTitle}>{title}</h2>
				</div>
				<div className={styles.itemsContainer}>
					<div
						className={styles.itemsAccordion}
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}>
						{items.map((item, i) => (
							<ParallaxItem
								key={i}
								{...item}
								progress={itemsCalculatedProgresses[i].progress}
								isActive={itemsCalculatedProgresses[i].isActive}
								hasStartingProgressBar={i === 1}
								hasEndingProgressBar={i === items.length - 1} />
						))}
					</div>
				</div>
				{/* <div className={styles.footNotes}>
					<p>{'Foot Notes Text Lorem Ipsum Dolor sin amet'}</p>
				</div> */}
			</div>
		</div>
	)
}

export default AnimatedTimeline
