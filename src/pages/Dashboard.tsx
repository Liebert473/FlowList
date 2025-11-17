import { logOut } from "@/lib/auth";
export const Dashboard = () => {
  return (
    <>
      <p className=" text-fl-text">
        <p className="bg-fl-orange bg-fl-fuchsia bg-fl-green bg-fl-pink bg-fl-red bg-fl-purple bg-fl-sky bg-fl-teal bg-fl-rose bg-fl-yellow bg-fl-blue bg-fl-slate bg-fl-lime"></p>
        Dashboard
      </p>
      <button onClick={logOut}>Logout</button>
    </>
  );
};
