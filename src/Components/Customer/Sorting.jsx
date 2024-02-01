import { Select, Option } from "@material-tailwind/react";

function Sorting() {
  return (
    <div>
      <div className="w-72">
        <Select label="Select Version">
          <Option>Material Tailwind HTML</Option>
          <Option>Material Tailwind React</Option>
          <Option>Material Tailwind Vue</Option>
          <Option>Material Tailwind Angular</Option>
          <Option>Material Tailwind Svelte</Option>
        </Select>
      </div>
    </div>
  );
}

export default Sorting;
