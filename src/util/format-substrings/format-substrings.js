/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { parseAnchorTag } from '../util-functions'
import styles from './format-substrings.module.scss'

/*
 * this function returns formatted (bold, italicized, hyperlinked) jsx
 * formatted text is denoted in ArchieML by <b> and <i> tags
 * hyperlinks are created using the Google Doc hyperlink functionality
 * [b] and [i] tags are used bolding or italicizing a hyperlink
 */

const formatSubstrings = (str, linkColor = 'white') => {

	const getLinkColor = () => {
		const linkClasses = {
			white: styles.linkWhite,
			darkGrey: styles.linkDarkGray,
			darkGray: styles.linkDarkGray,
			black: styles.linkBlack
		}

		return linkClasses[linkColor]
	}

	const getFontStyle = phrase => {
		if (phrase.includes('[b]')) {
			return styles.bold
		} else if (phrase.includes('[i]')) {
			return styles.italic
		}
		return null
	}

	const getHrefSpans = (phrase, formattedSubphrase, fontStyle) => {
		const delim = new RegExp(`(${formattedSubphrase})`) // split phrase into subphrase while keeping delimiter
		const textArray = phrase.split(delim)

		return textArray.map(subphrase => (
			<span
				key={subphrase}
				className={subphrase === formattedSubphrase ? fontStyle : null}>
				{subphrase}
			</span>
		))
	}

	const getFormattedHrefContent = (phrase, fontStyle) => {
		let formattedSubphrase // this is the subphrase that will be formatted bold or italics

		const getSubstring = (delimStart, delimEnd) => phrase.substring( // gets the subphrase between the tags
			phrase.indexOf(delimStart) + 3,
			phrase.indexOf(delimEnd)
		)

		if (fontStyle === styles.bold) {
			formattedSubphrase = getSubstring('[b]', '[/b]')
		} else if (fontStyle === styles.italic) {
			formattedSubphrase = getSubstring('[i]', '[/i]')
		} else {
			console.error('formatted subphrase does not exist')
		}

		const untaggedPhrase = phrase.replace(/\[.*?\]/g, '') // remove tags from phrase

		return getHrefSpans(untaggedPhrase, formattedSubphrase, fontStyle)
	}

	const phrases = str.split(/(?=<.*?>)/).map(phrase => {
		if (phrase.includes('href')) {
			const innerHtml = phrase.substring(phrase.indexOf('>') + 1) // need to use a modified innerHtml of what is in parseAnchorTag
			const fontStyle = getFontStyle(phrase) // returns formatting, if href has any

			return (
				<a
					key={innerHtml}
					className={getLinkColor()}
					href={parseAnchorTag(phrase).url}>
					{/* line below applies font-style (bold, italic) to subphrase in href if necessary */}
					{fontStyle ? getFormattedHrefContent(innerHtml, fontStyle) : innerHtml}
				</a>
			)
		} else if (phrase.includes('<b>')) {
			return (
				<span
					key={phrase}
					className={styles.bold}>
					{phrase.replace(/<.*?>/, '')}
				</span>
			)
		} else if (phrase.includes('<i>')) {
			return (
				<span
					key={phrase}
					className={styles.italic}>
					{phrase.replace(/<.*?>/, '')}
				</span>
			)
		} else {
			return (
				<span
					key={phrase}>
					{phrase.replace(/<.*?>/, '')}
				</span>
			)
		}
	})

	return phrases
}

export default formatSubstrings
