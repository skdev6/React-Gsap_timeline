import React from 'react'
import styles from './Timeline.module.scss'
const TimelineDescription = ({subTitle, title, description}, ref) => {
  return (
    <div className={styles.timelineDes}> 
        <h6 className={styles.subTitle}>{subTitle}</h6>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.textContent} ref={ref}>
            <p>{description}</p>
        </div>
    </div> 
  )
}

export default React.forwardRef(TimelineDescription); 