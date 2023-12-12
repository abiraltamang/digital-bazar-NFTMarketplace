import Dropdown from "./ExploreDropdown";

const GridList = () => {
  return (
    <div className="flex justify-end gap-4 pr-[35px] mt-[20px] mb-[20px]">
      <div className="w-[35px] bg-white flex justify-center">
        <img src="/grid.png" alt="grid" className="w-[30px]" />
      </div>
      <div className="w-[35px] bg-white flex justify-center">
        <img src="/list.png" alt="list" className="w-[30px]" />
      </div>
      <Dropdown />
    </div>
  );
};

export default GridList;
