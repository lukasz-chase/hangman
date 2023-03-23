const HEAD = (
  <div className="h-[30px] w-[30px] md:h-[50px] md:w-[50px] border-black rounded-full border-8 absolute top-[50px] right-[-20px]" />
);

const BODY = (
  <div className="h-[80px] w-[8px] md:h-[100px] md:w-[10px] bg-black absolute top-[100px] right-0" />
);

const RIGHT_ARM = (
  <div className="h-[8px] w-[80px] md:h-[10px] md:w-[100px] bg-black absolute top-[150px] right-[-100px] rotate-[-30deg] origin-bottom-left" />
);

const LEFT_ARM = (
  <div className="h-[8px] w-[80px] md:h-[10px] md:w-[100px] bg-black absolute top-[150px] right-[5px] rotate-[-30deg] origin-bottom-right" />
);

const RIGHT_LEG = (
  <div className="h-[8px] w-[80px] md:h-[10px] md:w-[100px] bg-black absolute top-[190px] right-[-90px] rotate-[60deg] origin-bottom-left" />
);

const LEFT_LEG = (
  <div className="h-[8px] w-[80px] md:h-[10px] md:w-[100px] bg-black absolute top-[190px] right-0 rotate-[-60deg] origin-bottom-right" />
);

export default [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
