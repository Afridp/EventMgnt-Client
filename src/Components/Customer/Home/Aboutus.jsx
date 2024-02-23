function Aboutus() {
  return (
    <>
    
        <div className="container mx-auto flex flex-col items-center my-24 md:mt- md:flex-row mb-">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <div className="relative p-4 border border-gray-600">
              <img
                src="https://images.pexels.com/photos/4577397/pexels-photo-4577397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="About Us Image"
                className="w-64 h-80"
              />
            </div>
          </div>
          <div className="md:ml-16">
            <h2 className="text-2xl font-bold md:mx-4 mb-4 text-center md:text-left">
              About Us
            </h2>
            <p className="text-gray-700 mx-4  text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              finibus eros nec neque placerat eleifend. Nullam scelerisque
              tincidunt turpis, nec cursus augue faucibus a. Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Corrupti ex placeat soluta
              aut sunt magni harum ipsam ducimus fugiat at, architecto,
              voluptatum ipsum eveniet velit minima alias non dolorum laborum.
            </p>
          </div>
        </div>
    
    </>
  );
}

export default Aboutus;
