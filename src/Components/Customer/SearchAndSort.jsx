import React from "react";

// eslint-disable-next-line react/prop-types, react/display-name
const SearchAndSort = React.memo(
  // eslint-disable-next-line react/prop-types
  ({ searchQuery, setSearchQuery, setSortOptions, sortOptions, forPage }) => {
   
    // const [sortOptions, setSortOptions] = useState("");

    // useEffect(() => {
    //   // This useEffect will be triggered whenever sortOptions changes
    //   onSort(sortOptions);
    // }, [sortOptions, onSort]);

    // const handleSearching = (query) => {
    //   setSearchQuery(query);
    //   onSearch(query);
    // };

    // const handleSorting = (sortOption) => {
    //   setSortOptions(sortOption);
    //   onSort(sortOption);
    // };

 

    return (
      <div className="flex items-center justify-around">
        <div className="relative w-full max-w-[24rem] mx-4">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 focus:outline-none shadow-sm sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <div>
          <div className="">
            <select
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              label="Sort By"
              id="sors"
              value={sortOptions}
              onChange={(e) => setSortOptions(e.target.value)}
            >
              {
                forPage == "eventList" ? (
                  <>
                    {/* <Option value="dateAscending">Date Ascending</Option> */}
                    <option value="" disabled defaultValue={true}>
                      Sort By{" "}
                    </option>
                    <option value="eventNameAscending">
                      Event Name Ascending{" "}
                    </option>
                    <option value="eventNameDescending">
                      Event Name Descending
                    </option>
                    {/* <Option value="dateDescending">Date Descending</Option> */}
                  </>
                ) : (
                  <>
                    <option value="" disabled defaultValue={true}>
                      Sort By{" "}
                    </option>
                    <option value="dateAscending">Date Ascending</option>
                    <option value="dateDescending">Date Descending</option>
                  </>
                )
              }
            </select>
          </div>
        </div>
      </div>
    );
  }
);

export default SearchAndSort;
