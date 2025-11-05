import { logOut } from "@/lib/auth";
export const Dashboard = () => {
  return (
    <>
      <p className=" text-fl-text">Dashboard</p>
      <button onClick={logOut}>Logout</button>
    </>
  );
};
