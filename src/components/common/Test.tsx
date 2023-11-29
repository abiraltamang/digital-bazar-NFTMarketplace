const howwoks = [
  {
    img: "/crypto/nft4.png",
    title: "Distant Galaxy",
    desc: "MoonDancer",
  },
  {
    img: "/crypto/nft4.png",
    title: "Distant Galaxy",
    desc: "MoonDancer",
  },
  {
    img: "/crypto/nft4.png",
    title: "Distant Galaxy",
    desc: "MoonDancer",
  },
];

const Test = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-10 px-[15px] text-white md:px-0 lg:gap-[60px]">
      <div className=" flex flex-col justify-start text-start sm:pl-0 lg:gap-2.5">
        <div className="text-[28px] font-semibold leading-[39px] lg:text-[38px] lg:leading-[45px]">
          How it works
        </div>
        <div className="text-base font-normal leading-[35px] lg:text-[22px]">
          Find out how to get started
        </div>
      </div>
      <div className="flex w-full max-w-[1050px] flex-col items-center justify-center gap-[30px] sm:flex-row">
        {howwoks.map((data, index) => {
          return (
            <div
              key={index}
              className=" flex max-h-fit w-full items-center gap-5 rounded-[20px] bg-[#3B3B3B] p-5 sm:h-[337px] sm:flex-col sm:justify-center sm:p-0 md:max-w-[330px] lg:h-[439px]"
            >
              <div>
                <img
                  src={data.img}
                  alt="img"
                  className="h-[100px] min-w-[100px] sm:h-[150px] lg:h-auto"
                />
              </div>
              <div className="flex w-full max-w-[155px] flex-col gap-2.5 text-start sm:text-center md:max-w-[170px] lg:max-w-[270px]">
                <div className="text-base font-semibold leading-[30px] lg:text-[22px]">
                  {data.title}
                </div>
                <div className="text-xs font-normal normal-case leading-4 lg:text-base lg:leading-[22px]">
                  {data.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Test;
