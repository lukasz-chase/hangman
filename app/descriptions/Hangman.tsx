const HEAD = (
  <div
    key="head"
    className="h-[30px] w-[30px] md:h-[50px] md:w-[50px] border-black rounded-full border-8 absolute top-[30px] md:top-[50px] right-[-10px] md:right-[-20px]"
  />
);

const BODY = (
  <div
    key="body"
    className="h-[80px] w-[8px] md:h-[100px] md:w-[10px] bg-black absolute top-[60px] md:top-[100px] right-0"
  />
);

const RIGHT_ARM = (
  <div
    key="right_arm"
    className="h-[8px] w-[60px] md:h-[10px] md:w-[100px] bg-black absolute top-[90px] md:top-[120px] right-[-60px] md:right-[-100px] rotate-[-30deg] origin-bottom-left"
  />
);

const LEFT_ARM = (
  <div
    key="left_arm"
    className="h-[8px] w-[60px] md:h-[10px] md:w-[100px] bg-black absolute top-[90px] right-[5px] md:top-[120px] md:right-0 rotate-[-30deg] origin-bottom-right"
  />
);

const RIGHT_LEG = (
  <div
    key="right_leg"
    className="h-[8px] w-[60px] md:h-[10px] md:w-[100px] bg-black absolute top-[130px] right-[-55px] md:top-[190px] md:right-[-90px] rotate-[60deg] origin-bottom-left"
  />
);

const LEFT_LEG = (
  <div
    key="left_leg"
    className="h-[8px] w-[60px] md:h-[10px] md:w-[100px] bg-black absolute top-[130px] right-0 md:top-[190px] md:right-0 rotate-[-60deg] origin-bottom-right"
  />
);

export default [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
