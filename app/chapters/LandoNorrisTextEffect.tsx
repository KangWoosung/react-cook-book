/*
2026-01-25 01:36:23


*/
'use client';
import React, { useState } from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";
import { Button } from "@/components/ui/button";

const LandoNorrisTextEffect = () => {
  const [landoNorrisTextEffectOn, setLandoNorrisTextEffectOn] = useState(false);


  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          2. Lando Norris Text Effect
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div className="flex-[2] min-w-0 border-0 border-red-500 p-4 gap-4 flex flex-col">
          <p className="text-lg font-light">LandoNorrisText.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component is inspired by Wes, Scott & CJ&apos;s play code:{" "}
            <br />
            <a
              href="https://www.youtube.com/watch?v=9H34nxxVEgc"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/watch?v=9H34nxxVEgc
            </a>
          </p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            Best regards to Wes, Scott & CJ!
          </p>
          <pre>
            Usage:
            <code className="block overflow-x-auto">
              {`
<LandoNorrisText enableLetterDown={false}>TIKTOK</LandoNorrisText>
<LandoNorrisText style={{ fontSize: "20px" }} hoverColor="blue">
  FACEBOOK
</LandoNorrisText>
              `}
            </code>
          </pre>
          <br />
          <Button
            variant="outline"
            className={landoNorrisTextEffectOn ? "rounded-full bg-purple-800 text-white" : "rounded-full"}
            onClick={() => {
              setLandoNorrisTextEffectOn(!landoNorrisTextEffectOn);
            }}
          >
            {landoNorrisTextEffectOn ? "Hide Lando Norris Text Effect" : "Show Lando Norris Text Effect"}
          </Button>
        </div>
        <div className="tech-stacks-container flex-[3] min-w-0 bg-gray-100 dark:bg-gray-800 p-8">
          {landoNorrisTextEffectOn && (
          <div className="flex flex-col gap-4 ">
            <LandoNorrisText enableLetterDown={false}>TIKTOK</LandoNorrisText>
            <LandoNorrisText enableLetterDown={true}>YOUTUBE</LandoNorrisText>
            <LandoNorrisText hoverColor="red">INSTAGRAM</LandoNorrisText>
            <LandoNorrisText style={{ fontSize: "20px" }} hoverColor="blue">
              FACEBOOK
            </LandoNorrisText>
            <LandoNorrisText
              style={{ fontSize: "40px" }}
              enableLetterDown={false}
            >
              🎉전혜진🐱‍💻💻
              </LandoNorrisText>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandoNorrisTextEffect;
