/* eslint-disable no-unused-vars */
import React from 'react'
import Parallax from './components/AnimatedTimeline/AnimatedTimeline'
import HeroAndIntro from './components/HeroAndIntro/HeroAndIntro'
import Opportunities from './components/Opportunities/Opportunities'
import mockData from './mockData'
import styles from './styles/App.module.scss'
import Timeline from './components/Animated_Timeline/Timeline'
function App () {
  return (
    <div className={styles.app}>
      <section
        style={{
          width: '100%'
        }}
      >
        <HeroAndIntro />
      </section>

      <section className={styles.timelineSection}>
        <Timeline/>
      </section>  

      {/* OLD TIMELINE CODE */}
        {/* <section style={{
          marginTop:50          
        }}>
          <div className={styles.animatedTimelineSection}>
            <Parallax
              contentClassName={styles.parallaxContent}
              breadcrumb={mockData.document.breadcrumb}
              title={mockData.document.title}
              description={mockData.document.description}
              speed={0.35}
              items={[
                { ...mockData.headerItem, isHeader: true },
                ...mockData.items
              ]}
            />
          </div>
        </section> */}
     
      <section className={styles.opportunitiesSection}>
        <Opportunities data={mockData.opportunitiesSection} />
      </section>

    </div>
  )
}

export default App
