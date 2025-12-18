interface Props {
  message: string;
}
import Svg404 from "./Svg404";

export const NotFound = ({ message }: Props) => {
  return (
    <div className="flex flex-col flex-1 items-center absolute gap-5 top-0 left-0 right-0 bottom-0 p-4 justify-center">
      <div className="w-full max-w-sm ">
        <Svg404 />
      </div>
      <p className="text-fl-primary font-bold text-xl">{message}</p>
    </div>
  );
};
