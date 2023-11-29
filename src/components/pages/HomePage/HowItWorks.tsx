import Text from "../../common/Typography/Text";
const sellNft = [
  {
    img: "/assets/paint.png",
    title: "Create Artwork",
    desc: "Create your collection, Add social links, a description, profile & banner images, and set a secondary sales fee",
  },
  {
    img: "/assets/time.png",
    title: "Add your NFTs",
    desc: "Upload your work, add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
  },
  {
    img: "/assets/box.png",
    title: "List them for sale",
    desc: "Choose between auctions and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!",
  },
];

const HowItWorks = () => {
  return (
    <div className="items-center flex flex-col gap-9 pb-9 ">
      <Text className="text-center text-black/60 pb-6" title weight="semibold">
        Create and sell your NFTs
      </Text>
      <div className="cursor-pointer flex flex-wrap justify-center gap-10  xl:gap-[84px] px-[4%] lg:px-0">
        {sellNft.map((data, index) => {
          return (
            <div
              key={index}
              className="px-4 duration-100 hover:shadow-xl hover:shadow-slate-500  w-full lg:max-w-[280px] xl:max-w-[337px] pb-[2%] max-h-fit bg-primary/80 rounded-2xl flex flex-col gap-2.5 items-center justify-center pt-4"
            >
              <div className="max-w-[100px] h-auto">
                <img src={data.img} alt="img" />
              </div>
              <Text
                className="whitespace-nowrap text-secondary"
                title
                variant={3}
                weight="semibold"
              >
                {data.title}
              </Text>
              <Text className="text-secondary/80 text-center">{data.desc}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
