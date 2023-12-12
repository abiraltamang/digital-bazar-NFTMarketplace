import { FaSearch } from "react-icons/fa";
const Upper = () => {
  return (
    <div className="bg-primary flex flex-col justify-center text-center">
      <h1 className="text-4xl font-bold mt-10 text-secondary">
        Hey, how can we help you?
      </h1>
      <div className="bg-slate-200 flex items-center rounded-lg px-6 gap-4 mx-[400px] mt-7 mb-14">
        <FaSearch color="gray" />
        <input
          type="text"
          placeholder="Search"
          className=" py-2 border-none focus:outline-none bg-slate-200"
        />
      </div>
    </div>
  );
};

export default Upper;
