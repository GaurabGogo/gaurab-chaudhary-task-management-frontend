import { Loader } from "lucide-react";

const MainLoader = () => {
  return (
    <div className="bg-background fixed top-0 left-0 z-999 flex h-screen w-full items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default MainLoader;
