/*
2025-12-06 01:04:36

*/
import React from "react";
import CSSTransitionDarkMode from "./chapters/CSSTransitionDarkMode";
import LandoNorrisTextEffect from "./chapters/LandoNorrisTextEffect";
import MyTechStacks from "./chapters/MyTechStacks";
import CurvedScrollBarContainer from "./chapters/CurvedScrollBarContainer";
import WavyBackground from "./chapters/WavyBackground";
import RainyGlassEffect from "./chapters/RainyGlassEffect";
import FulfillmentsForMobileWebApps from "./chapters/FulfillmentsForMobileWebApps";
import CookBookRepository from "./components/CookBookRepository";
import FrostedGlassEffect from "./chapters/FrostedGlassEffect";

export default function Home() {
  return (
    <React.Fragment>
      <CookBookRepository />

      <CSSTransitionDarkMode />

      <LandoNorrisTextEffect />

      <MyTechStacks />

      <CurvedScrollBarContainer />

      <WavyBackground />

      <RainyGlassEffect />

      <FrostedGlassEffect />

      <FulfillmentsForMobileWebApps />
    </React.Fragment>
  );
}
