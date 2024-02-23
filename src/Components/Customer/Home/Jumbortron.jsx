import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";


function Jumbortron() {

  return (
    <>
      <section className="bg-cover bg-[url('https://res.cloudinary.com/diwidawoi/image/upload/v1705678401/Jumbrotron%20image.jpg')] hero bg-gray-700 overflow-hidden bg-blend-multiply h-screen bg-center">
        <div className="px-4 mx-auto max-w-screen-xl text-left py-24 lg:py-56">
          <Fade delay={100}>
          <h1 className="mb-4 text-2xl tracking-tight leading-none text-white md:text-5xl lg:text-5xl font-thin">
            We invest in the world’s potential
          </h1>
          <p className="mb-8 text-sm font-extralight text-gray-300 lg:text-xl ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            accusamus expedita quaerat, a ipsa necessitatibus fugit atque ullam
            dicta nobis beatae saepe odit quam fuga, debitis maxime quasi ab
            amet?
          </p>
          </Fade>
          <div className="flex flex-col space-y-4  sm:flex-row sm:justif-left sm:space-y-0">
            <Fade delay={800}>
            <Link
              to='/events'
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-ce text-white rounded-lg bg-red-900 hover:bg-red-800 focus:ring-2 focus:ring-red-900 dark:focus:ring-blue-900"
            >
              Book Now
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-2 focus:ring-gray-400"
            >
              Learn more
            </Link>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jumbortron;
