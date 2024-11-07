import { Input } from "./ui/input";

function SearchBar() {
  return (
    <div className="flex w-1/3 justify-center items-center py-1">
        <Input
          type="text"
          placeholder="Search"
          className="text-white rounded-full p-4 bg-gray-700 border-gray-900 w-2/3"
        />
        <div className="bg-gray-700 h-9 w-9 ml-2 flex items-center justify-center px-2 rounded-full hover:bg-gray-800 transition-all ease-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
  )
}

export default SearchBar