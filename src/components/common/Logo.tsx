import { LogoIcon } from "./LogoIcon";

export default function Logo() {
  return (
    <div className="text-xl font-semibold flex items-center">
      <LogoIcon />
      <span className="text-fl-primary ml-2 mr-1">Flow</span>
      <span className="text-fl-text">List</span>
    </div>
  );
}
