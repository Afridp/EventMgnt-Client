/* eslint-disable react/no-unknown-property */
import { Typography } from "@material-tailwind/react";

function Login() {
  const centeredContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // This ensures that the container takes the full height of the viewport
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div style={centeredContainerStyle}>
      {/* //   <div className="artboard phone-2 bg-white p-7" style={artboardStyle}> */}
      <form onSubmit={handleSubmit} className="w-80 sm:w-95">
        <Typography
          color="gray"
          className="text-xl font-semibold mb-8 text-center"
        >
          Sign In
        </Typography>


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Top Right label</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Top Right label</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Top Right label</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </div>
        </label>
 


        <div className="flex justify-center">
          {/* // eslint-disable-next-line react/no-unknown-property */}
          <button
            type="button"
            class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
          >
            Sign In
          </button>
        </div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          New Member? {/* Add your Sign In link here */}
        </Typography>
      </form>
    </div>
  );
}

export default Login;
