import React from "react";
import ScrollableCard from "./ScrollableCard";
import Image from "next/image";

const ScrollableCard1 = () => {
  return (
    <ScrollableCard alwaysShow={true} radius={100}>
      <div className="flex flex-col gap-4">
        <h2>Grab the scrollbar thumb and scroll up or down.</h2>
        <p>
          <br />
          This Card is using the default settings and the radius 100px.
        </p>
        <pre>
          <code>
            {`
<CurvedScrollBarContainer
  radius={100}
  alwaysShow={true} >
    {children}
</CurvedScrollBarContainer>
                    `}
          </code>
        </pre>
        <Image
          src="/assets/img/card_img.jpg"
          alt="random"
          width={300}
          height={150}
          className="w-full h-full object-cover"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
        </p>
      </div>
    </ScrollableCard>
  );
};

export default ScrollableCard1;
