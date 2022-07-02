import React from 'react'
import styles from './Timeline.module.scss'
const TimelineItem = (props, ref) => {
  return (
    <>
        <div className={`${styles.timelineItem} timelineItem`}> 
            <span className={styles.tlYear}>{props.year}</span>
            <div className={styles.timelineContentWrapper} ref={ref}>
                <div className={`${styles.timelineContent} timelineContent`}>
                    <h4 className={`${styles.tlTitle} tlTitle`}>{props.name} <small>{props.subname}</small></h4>
                    <div className={styles.tlRow}> 
                        <div className={styles.tlColLeft}>
                            <div className={`${styles.leftText} leftText`}>
                                <h2 className={styles.title}>{props.heroKey}</h2>
                                <div className={`${styles.des} des`}>{props.heroDetail}</div>
                            </div>
                        </div>
                        <div className={styles.tlColRight}>
                            <div className={styles.rightText}>
                                <p>
                                    {props.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {props.endYear && (
             <div className={`${styles.timelineEndYear} timelineEndYear`}>
                <span className={styles.tlYear}>{props.endYear}</span>
                <div className={styles.eyBorder}></div>
             </div>
        )}
    </>
  )
}

export default React.forwardRef(TimelineItem);