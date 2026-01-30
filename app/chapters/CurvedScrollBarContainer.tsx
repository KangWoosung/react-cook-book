/*
2026-01-25 01:44:38



*/

import React from "react";
import ScrollableCard1 from "../components/cards/ScrollableCard1";
import ScrollableCard2 from "../components/cards/ScrollableCard2";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";

const CurvedScrollBarContainer = () => {
  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          4. Curved ScrollBar Container
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div className="flex-[2] min-w-0 min-h-52 border-0 border-red-500 p-4 gap-4 flex flex-col">
          <p className="text-lg font-light">CurvedScrollBarContainer.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component is re-organized from Chris Bolson&apos;s original
            work on Codepen.io: <br />
            <a href="https://codepen.io/cbolson/pen/vELrOPz" target="_blank">
              https://codepen.io/cbolson/pen/vELrOPz
            </a>
            <br />
            <br />
            Thanks to Chris Bolson for the great work!
          </p>
          <pre className="text-sm overflow-x-hidden">
            Usage:
            <code className="block overflow-x-auto">
              {`
  <CurvedScrollBarContainer
    radius={100}
    alwaysShow={true} >
      {children}
  </CurvedScrollBarContainer>
                `}
            </code>
            <br />
            or
            <br />
            <code className="block overflow-x-auto">
              {`
  <CurvedScrollBarContainer
    radius={20}
    thumbColor="rgb(154, 230, 0)"
    thumbColorActive="rgb(124, 207, 0)"
    trackColor="transparent"
    trackColorActive="transparent"
  >
      {children}
  </CurvedScrollBarContainer>
                `}
            </code>
          </pre>
        </div>
        <div
          className="tech-stacks-container flex-[3] min-w-0
        border-0 border-blue-500 flex max-lg:flex-col flex-row gap-4"
        >
          <ScrollableCard1 />
          <ScrollableCard2 />
        </div>
      </div>
    </div>
  );
};

export default CurvedScrollBarContainer;
