function Event() {
  return (
    <>
      <div className="container p-4 mt-20 mx-auto">
        <div className="p-2 dark:bg-gray-800 shadow-2xl border-slate-800 border relative lg:flex lg:items-center lg:justify-center md:w-3/4 sm:w-full mt-10 mx-auto rounded-g">
          <div className="gap-4 p-4 lg:p-12">
            <img
              src="https://images.pexels.com/photos/4791754/pexels-photo-4791754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full rounde-lg"
              alt="Tree"
            />
          </div>
          <div className="w-full py-6 sm:py-4 lg:py-8 px-4 z-20">
            <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-2xl">
              <span className="block">Mother hearth host your travel</span>
            </h2>
            <p className="text-sm mt-2">
              The state of Utah in the United States is home to lots of
              beautiful National parks. Bryce National Canyon Park ranks as
              three of the most magnificent &amp; awe-inspiring.
            </p>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-6 inline-flex rounded-md shadow">
                <button
                  className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 dark:bg-gray-800 shadow-2xl border-slate-800 border relative lg:flex lg:items-center lg:justify-center md:w-3/4 sm:w-full mt-10 mx-auto rounded-g">
          <div className="w-full py-6 sm:py-4 lg:py-8 px-4 z-20">
            <h2 className="text-xl font-extrabold text-black dark:text-white sm:text-2xl">
              <span className="block">Mother hearth host your travel</span>
            </h2>
            <p className="text-sm mt-2">
              The state of Utah in the United States is home to lots of
              beautiful National parks. Bryce National Canyon Park ranks as
              three of the most magnificent &amp; awe-inspiring.
            </p>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-6 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
                  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="gap-4 p-4 lg:p-12">
            <img
              src="https://images.pexels.com/photos/4791754/pexels-photo-4791754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full rounde-lg"
              alt="Tree"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
