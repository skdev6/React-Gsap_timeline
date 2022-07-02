/* eslint-disable multiline-comment-style */
/* eslint-disable consistent-return */
import React from 'react'

export const parseAnchorTag = anchorTag => {
	const url = anchorTag.substring(
		anchorTag.indexOf('"') + 1,
		anchorTag.lastIndexOf('"')
	)
	const innerHtml = anchorTag.substring(
		anchorTag.indexOf('>') + 1,
		anchorTag.lastIndexOf('<') ? 	anchorTag.lastIndexOf('<') : null
	)

	return { url, innerHtml }
}

export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

// https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
export const toTitleCase = str => {
	const spaces = str.replace(/([A-Z])/g, ' $1').toLowerCase() // insert a space before all capital letters and lowercase all letters
	return capitalizeFirstLetter(spaces) // uppercase the first letter
}

// on a mobile device, this opens a new tab
export const openWindow = url => {
	window.open(url, '', `width=600, height=500, top=0, left=0`)
}

export const iOS = (/iPad|iPhone|iPod/).test(navigator.platform) ||
  (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints > 1)

export const randomElement = arr => arr[Math.floor(Math.random() * arr.length)]

export const svgToBase64 = svgStr => `data:image/svg+xml;base64,${window.btoa(svgStr)}`

const getEndRoute = href => {
	const slashPos = href.lastIndexOf('/')
	return href.substr(slashPos + 1)
}

// does the current page equal the carousel element?
export const isCurrentPage = href => {
	const endRoute = getEndRoute(href)
	return window.location.pathname.toLowerCase().includes(endRoute.toLowerCase())
}

// replaces the stroke color of an svg (only works for a single stroke color)
export const setIconStroke = (svgStr, stroke) => {
	if (svgStr) {
		const start = svgStr.substring(svgStr.indexOf('stroke:'))

		const strokeToReplace = start.substring(start.indexOf('#'), start.indexOf(';'))

		const newStroke = svgStr.replace(`stroke:${strokeToReplace};`, `stroke:${stroke};`)

		return svgToBase64(newStroke)
	}
}

export const splitBr = str => {
	const split = str.split(/<br\/>/).map(substr => {
		return (
			<div key={substr}>{substr}</div>
		)

	})

	return split
}

export const callAnalytics = analyticsText => {
	window.appEventData.push({
		event: 'UI Item Clicked',
		linkInfo: {
			category: 'interactive',
			analyticsText
		}
	})
}

export const toMMSS = time => {
	const secNum = parseInt(time, 10) // don't forget the second param
	let hours = Math.floor(secNum / 3600)
	let minutes = Math.floor((secNum - (hours * 3600)) / 60)
	let seconds = secNum - (hours * 3600) - (minutes * 60)

	if (hours < 10) { hours = `0${ hours}` }
	if (minutes < 10) { minutes = `0${ minutes}` }
	if (seconds < 10) { seconds = `0${ seconds}` }
	return `${minutes}:${seconds}`
}
