import { useRef, useEffect } from 'react'
import React from 'react'
import {gsap, ScrollTrigger} from 'gsap/all'
import TimelineDescription from './TimelineDescription'
import TimelineItem from './TimelineItem'
import mockData from '../../mockData'
import addToRefs from '../../service/addToRefs'
import styles from './Timeline.module.scss'
 
const Timeline = () => {

  gsap.registerPlugin(ScrollTrigger);

  const tlWrap = useRef(null);
  const tlItemsWrap = useRef(null);
  const tlHeaderText = useRef(null);
  const tlItems = useRef([]);

  const TimelineAni = (tab = null, mobile = null) => {
    const TL = gsap.timeline({
      scrollTrigger:{
        trigger:tlWrap.current,
        start:"-30 top",
        end:()=>{ 
          return `+=${tlItems.current.length * 1200}`;  
        }, 
        scrub:0.5, 
        pin:true,
        pinType:'fixed',
      }
    });
    let tlItemLength = tlItems.current.length;
    let TlContentEl = [];
    let TlTitleContentEl = [];
    let TlDesContentEl = [];
    tlItems.current.forEach((el, i)=>{ 

        const prevItem = i - 1;
        const nextItem = i + 1;
        const ParentEl = el.closest(".timelineItem");
        
        let tlItemMinHeight;
        TlContentEl.push(el.querySelector(".timelineContent"));
        TlTitleContentEl.push(el.querySelector(".timelineContent .tlTitle")); 
        TlDesContentEl.push(el.querySelector(".timelineContent .leftText .des"));
        // 
        const deactivateTextColor = "#707D86";
        const deactivateBorderColor = "#707D86"; 
        const deactivateFw = 400;
        const activeTextColor = "#34B4F4";
        const activeBorderColor = "#FFFFFF"; 
        const activeFw = 600;
        gsap.set([el.closest(".timelineItem"), '.timelineEndYear'], { "--active-border-color" : deactivateBorderColor, "--active-text-color" : deactivateTextColor, "--active-fw":deactivateFw });
        

        if(mobile){ 
          tlItemMinHeight = 40; 
        }else if(tab){ 
          tlItemMinHeight = 50; 
        }else{
          tlItemMinHeight = 69; 
        }
        gsap.set(TlContentEl[i], {
          autoAlpha:0,
          yPercent:-40
        });
        gsap.set(TlTitleContentEl[i], { 
          autoAlpha:0,
          yPercent:300
        });
        gsap.set(TlDesContentEl[i], {
          autoAlpha:0,
          yPercent:-100
        });
        
        if(i < 1){

          // let getHeaderTextMb = getComputedStyle(tlHeaderText.current).marginBottom;
          // let getHeaderTextHeightWithMb = tlHeaderText.current.offsetHeight + parseInt(getHeaderTextMb, 10);
          // let getFirstELHeight = el.scrollHeight;
          TL.to(tlHeaderText.current, { 
            opacity:0,
          }, "-=0.5") 
          TL.to(el, { 
            height:'auto', 
            duration:0.5,
          })
          .to(ParentEl, { "--active-border-color" : activeBorderColor, "--active-text-color" : activeTextColor, "--active-fw":activeFw, duration:0.5, }, "-=0.5")
          .to(tlItems.current[nextItem].closest(".timelineItem"), { "--active-border-color" : activeBorderColor, "--active-text-color" : activeTextColor, "--active-fw":activeFw, duration:0.5, }, "-=0.5")
          TL.to(tlHeaderText.current, { 
            height: 0,  
            marginBottom:0,
            // paddingBottom:getHeaderTextHeightWithMb - getFirstELHeight
          }, "-=0.5") 
          // TL.to(".tlItemsWrap", { 
          //   y:-getFirstELHeight
          // }, "-=0.5")
          TL.to(TlContentEl[i], {
            autoAlpha:1,
            yPercent:0
          }, "-=0.5") 
          TL.to(TlTitleContentEl[i], {
            autoAlpha:1,
            yPercent:0
          }, "-=0.5") 
          TL.to(TlDesContentEl[i], {
            autoAlpha:1,
            yPercent:0
          }, "-=0.5")
 
        }else{
          
          TL.to(tlItems.current[prevItem], {
            height:tlItemMinHeight,
            duration:0.5,
          }, "+=0.5").to(tlItems.current[prevItem].closest(".timelineItem"), { "--active-border-color" : deactivateBorderColor, "--active-text-color" : deactivateTextColor, "--active-fw":deactivateFw, duration:0.5, }, "-=0.5")

          TL.to(TlContentEl[prevItem], { 
            autoAlpha:0,
            yPercent:-40
          }, "-=0.5") 
          TL.to(TlTitleContentEl[prevItem], {
            autoAlpha:1,
            yPercent:300
          }, "-=0.5") 
          TL.to(TlDesContentEl[prevItem], {
            autoAlpha:1,
            yPercent:-100
          }, "-=0.5") 


          TL.to(el, { 
            height:'auto',
          }, "-=0.5").to(ParentEl, { "--active-border-color" : activeBorderColor, "--active-text-color" : activeTextColor, "--active-fw":activeFw, duration:0.5, }, "-=0.5")

          if(tlItems.current[nextItem]){
            TL.to(tlItems.current[nextItem].closest(".timelineItem"), { "--active-border-color" : activeBorderColor, "--active-text-color" : activeTextColor, "--active-fw":activeFw, duration:0.5, }, "-=0.5")
          }else{
            TL.to(".timelineEndYear", { "--active-border-color" : activeBorderColor, "--active-text-color" : activeTextColor, "--active-fw":activeFw, duration:0.5, }, "-=0.5")
          }

          TL.to(TlContentEl[i], { 
            autoAlpha:1,
            yPercent:0
          }, "-=0.5") 
          TL.to(TlTitleContentEl[i], {
            autoAlpha:1,
            yPercent:0
          }, "-=0.5") 
          TL.to(TlDesContentEl[i], {
            autoAlpha:1,
            yPercent:0
          }, "-=0.5") 

        }
        if(tlItemLength === i + 1){ 
          TL.to(el, {
            height:tlItemMinHeight,
            duration:0.5,
          }, "+=0.5").to(ParentEl, { "--active-border-color" : deactivateBorderColor, "--active-text-color" : deactivateTextColor, "--active-fw":deactivateFw, duration:0.5, }, "-=0.5")

          TL.to(".timelineEndYear", { "--active-border-color" : deactivateBorderColor, "--active-text-color" : deactivateTextColor, "--active-fw":deactivateFw, duration:0.5, }, "-=0.5")
          
          TL.to(TlTitleContentEl[i], {  
            autoAlpha:1,
            yPercent:300
          }, "-=0.5") 
          TL.to(TlDesContentEl[i], {
            autoAlpha:1,
            yPercent:-100
          }, "-=0.5") 
          TL.to(TlContentEl[i], { 
            autoAlpha:0,
            yPercent:-40
          }, "-=0.4") 
        }
    })
  }


  useEffect(() => {
    
    ScrollTrigger.matchMedia({ 
      /**
       * TimelineAni(Tab = bool, Mobile = bool);  
      */
       "(min-width:1026px)":function(){
          TimelineAni(false, false); 
        },
       "(max-width:1025px)": function() {
        TimelineAni(true, false);  
      }, 
      "(min-width: 768px) and (max-width: 991px)": function() { 
        TimelineAni(true, false);  
      },
      "(max-width:767px)": function() {
        TimelineAni(false, true);  
      },
      "(max-width:400px)": function() {
        TimelineAni(false, true);  
      },
      "(max-width:370px)": function() { 
        TimelineAni(false, true);  
      },
    })
  }, []);

  return ( 
    <div className={styles.timelineWrapper} ref={tlWrap}>
      <TimelineDescription
        ref={tlHeaderText}
        subTitle={mockData.document.breadcrumb}
        title={mockData.document.title}
        description={mockData.headerItem.description}
      />
      <div className={styles.tlItemsWrap} ref={tlItemsWrap}>
          <span className={styles.leftTlProgress}></span>
          {mockData.items.map((item, i)=> <TimelineItem ref={(el)=>addToRefs(el, tlItems)} {...item} key={i} /> )}
      </div>
  </div>
  )
}

export default Timeline