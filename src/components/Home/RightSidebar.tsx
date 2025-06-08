import RightBody from "./RightBody";
import RightHeader from "./RightHeader";

const RightSidebar = () => {
  return (
    <div className="h-screen overflow-y-auto space-y-2 pb-14">
      <RightHeader />
      <RightBody />
    </div>
  );
};

export default RightSidebar;
