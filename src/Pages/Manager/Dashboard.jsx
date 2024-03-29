/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="fixed z-50 justify-center w-full mx-auto bg-white border-b">
        <div className="relative justify-center w-full mx-auto bg-white">
          <div className="relative flex flex-col w-full max-w-6xl px-8 py-4 mx-auto bg-white md:px-12 md:items-center md:justify-between md:flex-row lg:px-32">
            <div className="flex flex-row items-center justify-between text-gray-900">
              <a
                className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 uppercase"
                href="/"
              >
                Agency
              </a>
              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      className="hidden"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  ) : (
                    <path
                      className="inline-flex"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
            <nav
              className={`flex-col items-center flex-grow ${
                open ? "flex" : "hidden"
              } gap-6 p-4 px-5 opacity-100 md:px-0 md:pb-0 md:flex md:justify-start md:flex-row lg:p-0 md:mt-0`}
            >
              <a
                className="py-2 text-xs font-semibold text-gray-900 uppercase hover:text-gray-400 focus:outline-none focus:shadow-none focus:text-gray-900/90 md:ml-auto"
                href="#services"
              >
                Services
              </a>
              <a
                className="py-2 text-xs font-semibold text-gray-900 uppercase hover:text-gray-400 focus:outline-none focus:shadow-none focus:text-gray-900/90"
                href="#benefits"
              >
                Benefits
              </a>
              <a
                className="py-2 text-xs font-semibold text-gray-900 uppercase hover:text-gray-400 focus:outline-none focus:shadow-none focus:text-gray-900/90"
                href="#pricing"
              >
                Pricing
              </a>
              <a
                className="py-2 text-xs font-semibold text-gray-900 uppercase hover:text-gray-400 focus:outline-none focus:shadow-none focus:text-gray-900/90"
                href="#faq"
              >
                FAQ
              </a>
              <a
                className="flex items-center justify-center w-auto h-8 px-4 py-2 text-xs font-semibold text-white uppercase transition-all bg-black rounded-full shrink-0 hover:bg-accent-500"
                href="#_"
                role="button"
              >
                Download Agency
              </a>
            </nav>
          </div>
        </div>
      </section>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <section className="h-screen">
        <div className="relative h-full max-w-6xl px-8 py-12 mx-auto md:px-12 lg:pt-24 lg:px-32">
          <div className="lg:p-20 lg:text-center mt-20">
            <p className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl">
              Front-end development at your
              <span>fingertips whenever you need it and want it.</span>
            </p>
            <div className="flex flex-col gap-2 mt-12 md:flex-row lg:justify-center">
              <a
                href="#pricing"
                className="flex items-center justify-center w-auto h-10 px-4 py-2 text-sm font-semibold text-black transition-all rounded-full shrink-0 bg-orange-500 hover:bg-accent-400"
              >
                See our pricing
              </a>
              <a
                href="#services"
                className="flex items-center justify-center w-auto h-10 px-4 py-2 text-sm font-semibold text-gray-900 transition-all bg-gray-100 rounded-full shrink-0 hover:bg-gray-200"
              >
                Checkout our services
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-full max-w-6xl px-8 pb-12 mx-auto md:px-12 lg:px-32">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <h2 className="text-lg font-semibold leading-8 text-center text-gray-900">
              Happy companies around the world.
            </h2>
            <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
                src="./images/logos/8.svg"
                alt="#_"
                width="158"
                height="48"
              />
              <img
                className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
                src="./images/logos/2.svg"
                alt="#_"
                width="158"
                height="48"
              />
              <img
                className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
                src="./images/logos/3.svg"
                alt="3"
                width="158"
                height="48"
              />
              <img
                className="object-contain w-full col-span-2 max-h-12 sm:col-start-2 lg:col-span-1"
                src="./images/logos/4.svg"
                alt="#_"
                width="158"
                height="48"
              />
              <img
                className="object-contain w-full col-span-2 col-start-2 max-h-12 sm:col-start-auto lg:col-span-1"
                src="./images/logos/5.svg"
                alt="#_"
                width="158"
                height="48"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="scroll-mt-24 o" id="pricing">
        <div className="h-full max-w-6xl px-8 py-24 mx-auto md:px-12 lg:px-32">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl">
              Simple pricing
            </h2>
            <p className="max-w-xs mx-auto mt-4 text-sm text-gray-500">
              Explore our range of flexible pricing plans to suit your unique
              requirements
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-24 lg:grid-cols-3">
            <div className="flex flex-col justify-between h-full gap-8 p-8 bg-gray-100 rounded-4xl">
              <div>
                <h3 className="text-base font-medium tracking-tight text-gray-900">
                  Limitless - $2999/month
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  Infinite requests and revisions, with the flexibility to
                  cancel at any time. Ideal for startups and agencies.
                </p>
              </div>
              <a
                className="flex items-center justify-center w-auto h-10 px-4 py-2 text-sm font-semibold text-gray-900 transition-all bg-white rounded-full shrink-0 hover:bg-gray-800 hover:text-white"
                href="/contact"
              >
                Get started
              </a>
            </div>
            <div className="flex flex-col justify-between h-full gap-8 p-8 bg-black rounded-4xl">
              <div>
                <h3 className="text-base font-medium tracking-tight text-white">
                  Set Rate - $299/page
                </h3>
                <p className="mt-4 text-sm text-white">
                  Transparent fixed pricing from the start. Perfect for
                  designers or those well-versed in Jamstack.
                </p>
              </div>
              <a
                className="flex items-center justify-center w-auto h-10 px-4 py-2 text-sm font-semibold text-gray-900 transition-all bg-white rounded-full shrink-0 hover:bg-gray-800 hover:text-white"
                href="/start"
              >
                Get started
              </a>
            </div>
            <div className="flex flex-col justify-between h-full gap-8 p-8 bg-gray-100 rounded-4xl">
              <div>
                <h3 className="text-base font-medium tracking-tight text-gray-900">
                  Tailored Quotation
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  Expect your estimate within 1 business day. Ideal for
                  individuals new to Jamstack architecture or intricate
                  projects.
                </p>
              </div>
              <a
                className="flex items-center justify-center w-auto h-10 px-4 py-2 text-sm font-semibold text-gray-900 transition-all bg-white rounded-full shrink-0 hover:bg-gray-800 hover:text-white"
                href="/contact"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="scroll-mt-24" id="faq">
        <div className="h-full max-w-6xl px-8 py-24 mx-auto md:px-12 lg:px-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl">
                FAQ
              </p>
              <p className="max-w-xs mx-auto mt-4 text-sm text-gray-500">
                Frequent questions & answers
              </p>
            </div>
            <div className="flex flex-col gap-6 text-base text-gray-400 lg:col-span-2">
              <details>
                <summary className="text-base font-medium tracking-tight text-gray-900">
                  What does Jamstack entail?
                </summary>
                <p className="pt-4 text-sm text-gray-500">
                  JAMstack is an innovative approach to web development that
                  stands for JavaScript, APIs, and Markdown. It's all about
                  creating faster websites with improved SEO rankings and a
                  better overall user experience.
                </p>
              </details>
              <details>
                <summary className="text-base font-medium tracking-tight text-gray-900">
                  What coding languages ?
                </summary>
                <p className="pt-4 text-sm text-gray-500">
                  We utilize a range of modern technologies and languages to
                  create your websites, including HTML, CSS, JavaScript, and
                  various frameworks like React or Vue.js. Additionally, we work
                  with headless Content Management Systems (CMS) and APIs to
                  manage content efficiently.
                </p>
              </details>
              <details>
                <summary className="text-base font-medium tracking-tight text-gray-900">
                  How fast will I get my coded website?
                </summary>
                <p className="pt-4 text-sm text-gray-500">
                  The speed of delivery depends on the complexity of your
                  project and your specific requirements. We aim to provide
                  swift delivery, and we'll discuss the timeline during our
                  initial consultation. Rest assured, we're committed to
                  delivering your website as efficiently as possible.
                </p>
              </details>
              <details>
                <summary className="text-base font-medium tracking-tight text-gray-900">
                  How can I check the progress of my website?
                </summary>
                <p className="pt-4 text-sm text-gray-500">
                  We'll set up a convenient communication channel, such as email
                  or a project management platform, to keep you updated on the
                  progress of your website. You can communicate with us, ask
                  questions, and provide feedback through this channel to ensure
                  a smooth collaboration.
                </p>
              </details>
              <details>
                <summary className="text-base font-medium tracking-tight text-gray-900">
                  If I have a blog, do you count each post as a separate page?
                </summary>
                <p className="pt-4 text-sm text-gray-500">
                  The way we structure and charge for your blog pages can vary
                  depending on your specific needs. Generally, individual blog
                  posts can be counted as separate pages, but this can be
                  discussed and tailored to your preferences during our project
                  discussions. We aim to be flexible and accommodating to meet
                  your requirements.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="h-full max-w-6xl px-8 py-24 mx-auto md:px-12 lg:px-32">
          <div className="pt-12 border-t">
            <div className="border-gray-900 xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="text-black">
                <div className="inline-flex items-center gap-3">
                  <p className="text-2xl font-bold uppercase">Agency</p>
                </div>
                <p className="mt-2 text-sm text-gray-500 lg:w-4/5">
                  Windstatic, basic and sturdy themes under the creative commons
                  license.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-12 lg:grid-cols-3 lg:mt-0 xl:col-span-2">
                <div>
                  <h3 className="text-black">Information</h3>
                  <ul role="list" className="mt-4 space-y-2">
                    <li>
                      <a
                        href="#_"
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        License
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-black">Socials</h3>
                  <ul role="list" className="mt-4 space-y-2">
                    <li>
                      <a
                        href="https://twitter.com/lexingtonthemes"
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        @lexingtonthemes
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/Mike_Andreuzza"
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        @Mike_Andreuzza
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-black">Premium Themes</h3>
                  <ul role="list" className="mt-4 space-y-2">
                    <li>
                      <a
                        href="https://lexingtonthemes.com/"
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        Lexington Themes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-12 md:flex-row md:items-center md:justify-between">
              <p className="text-left">
                <span className="mx-auto mt-2 text-sm text-gray-500 lg:mx-0">
                  © Windstatic. By:
                  <a
                    className="text-black hover:text-accent-500"
                    href="https://michaelandreuzza.com/"
                  >
                    Michael Andreuzza
                  </a>
                  Demo Images: Respective owners.
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;
