import { DotSpinner } from "@uiball/loaders";

interface ILoaderProps {
  cover?: boolean;
  indicator?: string;
  color?: string;
}

const Loader = ({ cover, indicator, color }: ILoaderProps) => {
  return (
    <div
      className={`${
        cover ? "w-full h-screen absolute top-0 right-0 z-50 bg-black/30" : ""
      } flex justify-center items-center gap-2`}
    >
      <DotSpinner size={30} speed={0.9} color={color ? color : "white"} />
      {!cover && !indicator && <span>Loading...</span>}
      {!cover && indicator && <span>{indicator}</span>}
    </div>
  );
};

export default Loader;
