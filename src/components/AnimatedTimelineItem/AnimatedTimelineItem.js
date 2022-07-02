/* eslint-disable indent */
/* eslint-disable react/jsx-no-literals */
//
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react'

import { bool, number, string } from 'prop-types'
import styles from './AnimatedTimelineItem.module.scss'

function easeInExpo(t, b, c, d) {
  return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
}

/*
 * from: [number, number];
 * to: [number, number];
 */
const normalizeRange = (from, to) => {
  return val => {
    const nFrom = val - from[0]

    const ratioFrom = nFrom / (from[1] - from[0])
    const ratioTo = (to[1] - to[0]) * ratioFrom

    return ratioTo + to[0]
  }
}

const normalizeContentOpacity = normalizeRange([0, 0.8], [0, 1])

const AnimatedTimelineItem = props => {
  // This is needed in order to add a delay effect!
  const headerOpacity = normalizeContentOpacity(easeInExpo(props.progress, 0, 1, 1))
  // const contentOpacity = easeInExpo(props.progress);

  return (
    <div
      className={`${styles.parallaxItemContainer} ${props.isActive && !props.isHeader
        ? styles.parallaxItemContainerActive
        : ''
        }`}
      style={{ flex: props.progress }}>
      {
        <div className={styles.parallaxItemStretchedContainer}>
          {props.isHeader ? (
            <div style={{opacity: headerOpacity, width: '50%'}} className={`${styles.widthItems}`}>
              <p style={{ marginBottom: '85px' }} className={styles.parallaxItemDescription}>
                {props.description}
              </p >
            </div>
          ) : (
            <div className={styles.parallaxItemStretchedContainer}>
              <div className={styles.parallaxItemMarkings}>
                <span
                  className={`${styles.parallaxItemYear} ${props.isActive ? styles.parallaxItemYearActive : ''
                    }`}>
                  {props.year}
                </span>
                <div
                  className={styles.parallaxItemMarkingsBar}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(94,157,255, 1) 50%, rgba(255,255,255,0) 100%)`

                  }} />
                {props.hasStartingProgressBar && (
                  <div
                    className={[
                      styles.parallaxItemMarkingsBar,
                      styles.parallaxItemMarkingBarStarting
                    ].join(' ')} />
                )}
                {props.hasEndingProgressBar && (
                  <div
                    className={[
                      styles.parallaxItemMarkingsBar,
                      styles.parallaxItemMarkingBarEnding
                    ].join(' ')} />
                )}
                {props.endYear && (
                  <span
                    className={`${styles.parallaxItemEndYear} ${props.isActive ? styles.parallaxItemYearActive : ''}`}>
                    {props.endYear}
                  </span>
                )}
              </div>
              <div
                className={styles.parallaxItemContent}
                style={{
                  ...(props.isActive && {
                    borderColor: `rgba(255, 255, 255, ${props.progress})`
                  })
                }}>
                <div
                  style={{ opacity: headerOpacity }}
                  className={styles.decadeName}>
                  <h3 style={{ color: '#FFFFFF' }}>
                    {props.name}{' '}
                    <span className={styles.subname}>{props.subname}</span>
                  </h3>
                </div>
                <div
                  className={styles.parallaxItemStretchedContainer}
                  style={{ opacity: headerOpacity }}>
                  <div className={styles.parallaxItemContentLeftSide}>
                    <div className={styles.parallaxItemFloatingContainer}>
                      <h2 className={styles.parallaxItemHeroKey}>
                        {props.heroKey}
                      </h2>
                      <h5 className={styles.parallaxItemHeroDetail}>
                        {props.heroDetail}
                      </h5>
                    </div>
                  </div>
                  <div className={styles.parallaxItemContentRightSide}>
                    <div className={styles.parallaxItemFloatingContainer}>
                      <div className={styles.parallaxItemDescriptionWrapper}>
                        <p className={styles.parallaxItemDescription}>
                          {props.description}
                          {/* Job gains associated may be front-loaded when the
                          majority of building insulation is set to be
                          installed. Additional jobs will be created to perform
                          retrofits and installation of low-emissions products,
                          averaging to{' '}
                          <span className={styles.spanText}>
                            1 million new jobs annually by 2050.
                          </span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default AnimatedTimelineItem

AnimatedTimelineItem.propTypes = {
  isHeader: bool,
  maxHeight: number,
  progress: number, // percentage
  isActive: bool,
  hasStartingProgressBar: bool,
  hasEndingProgressBar: bool,

  name: string,
  subname: string,
  description: string,
  heroKey: string,
  heroDetail: string,
  year: string,
  endYear: string
}
