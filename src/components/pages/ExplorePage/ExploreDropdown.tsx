import { Menu } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface DropdownProps {
  onSelectOption: (option: string) => void;
}

const Dropdown = ({ onSelectOption }: DropdownProps) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="border-2 hover:bg-gray-100 border-gray-500 w-32 text-primary px-4 py-1 font-semibold rounded-md flex justify-center items-center gap-3  ">
          <span>Sort by</span>
          <MdKeyboardArrowDown />
        </Menu.Button>
        <Menu.Items className="absolute w-44 mt-1 right-0 bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg z-50">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active
                    ? "bg-primary/80 text-white rounded-md"
                    : "text-gray-800"
                } px-4 py-2 w-full text-left focus:outline-none`}
                onClick={() => onSelectOption("price-low-to-high")}
              >
                Price: low to high
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active
                    ? "bg-primary/80 text-white rounded-md"
                    : "text-gray-800"
                } px-4 py-2 w-full text-left focus:outline-none`}
                onClick={() => onSelectOption("price-high-to-low")}
              >
                Price: High to low
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active
                    ? "bg-primary/80 text-white rounded-md"
                    : "text-gray-800"
                } px-4 py-2 w-full text-left focus:outline-none`}
                onClick={() => onSelectOption("latest")}
              >
                Latest
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Dropdown;
