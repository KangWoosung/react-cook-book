import React from "react";
import ScrollableCard from "./ScrollableCard";

const ScrollableCard2 = () => {
  return (
    <ScrollableCard
      radius={20}
      thumbColor="rgb(154, 230, 0)"
      thumbColorActive="rgb(124, 207, 0)"
      trackColor="transparent"
      trackColorActive="transparent"
    >
      <div className="flex flex-col gap-4">
        <h2>Grab the scrollbar thumb and scroll up or down.</h2>
        <p>
          <br />
          This Card is using custom settings and the radius 20px.
        </p>
        <pre>
          <code>
            {`
<CurvedScrollBarContainer
  radius={20}
  alwaysShow={false}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae,
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          rem at esse reiciendis ullam veritatis sapiente sit ducimus ea magnam
          nihil vero corrupti quo quae, tempore dolor, reprehenderit debitis?
        </p>
      </div>
    </ScrollableCard>
  );
};

export default ScrollableCard2;
