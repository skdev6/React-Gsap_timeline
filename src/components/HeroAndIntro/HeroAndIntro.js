/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import styles from "./HeroAndIntro.module.scss";

const HeroIntro = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const opacity = Math.min(100 / currentScrollHeight, 1);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    AOS.init({
      duration: 1000,
    });
    window.addEventListener("scroll", handleScroll);

    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY / 50) * 50;
      if (currentScrollHeight !== newScrollHeight) {
        setCurrentScrollHeight(newScrollHeight);
      }
    };

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div style={{ height: "100vh" }}></div>
      </div>
    </div>
  );
};

export default HeroIntro;
