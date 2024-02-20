function Dashboard() {
  return (
    <>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto 2xl:max-w-7xl sm:px-6 md:px-8">
              <div className="py-4">
                <div className="h-screen rounded-lg">
                  <a
                    className="inline-block bg-black px-8 my-6 py-3 text-sm font-medium text-white transition"
                    role="button"
                    tabIndex="0"
                  >
                    Current Event
                  </a>
                  <div className="bg-blue-gray-50 p-5 rounded-md flex items-center">
                    <div className="mr-6">
                      <img
                        src="https://images.pexels.com/photos/8123311/pexels-photo-8123311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                        className="w-64 h-auto rounded-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-60">
                      <div className="text-left ">
                        <div className="items-start flex flex-col gap-10">
                          <h1 className="text">Name :</h1>
                          <h2 className="text">Place :</h2>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="items-end flex flex-col gap-10">
                          <h3 className="text">Venue :</h3>
                          <h1 className="text">Location :</h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="inline-block bg-black px-8 my-6 py-3 text-sm font-medium text-white transition"
                    role="button"
                    tabIndex="0"
                  >
                    Upcoming Events
                  </button>
                  <div className="flex overflow-x-auto gap-2">
                    <div className="card w-64 bg-blue-gray-50 shadow-sm">
                      <figure className="p-4">
                        <img
                          src="https://images.pexels.com/photos/8123311/pexels-photo-8123311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Shoes"
                          className="rounded-sm"
                        />
                      </figure>
                      <div className="card-body items-center text-center grid grid-flow-row gap-5 justify-items-center">
                        <h2 className="card-title">type</h2>
                        <h2>date</h2>
                        <h2>Venue</h2>
                      </div>
                    </div>

                    <div className="card w-64 bg-blue-gray-50 shadow-sm">
                      <figure className="p-4">
                        <img
                          src="https://images.pexels.com/photos/8123311/pexels-photo-8123311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="Shoes"
                          className="rounded-sm"
                        />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">type</h2>
                        <h2>date</h2>
                        <h2>Venue</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
