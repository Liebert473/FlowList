import { logOut } from "@/lib/auth";
export const Dashboard = () => {
  return (
    <>
      Dashboard
      <button onClick={logOut}>Logout</button>
    </>
  );
};
