import Content from "../components/Home/Content";
import LeftSidebar from "../components/Home/LeftSidebar";
import RightSidebar from "../components/Home/RightSidebar";
import { isChatOpen } from "../redux/features/message/messageSlice";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const chatOpen = useAppSelector(isChatOpen);

  return (
    <div className="mx-0 top-16 right-0 left-0 fixed min-h-[90vh] w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4">
        {/* Left Sidebar */}
        <div
          className={`
        ${chatOpen ? "hidden" : "block"} 
        md:block 
        ${chatOpen ? "md:col-span-2" : "md:col-span-2"} 
        lg:col-span-1
      `}
        >
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div
          className={`
        ${chatOpen ? "block" : "hidden"} 
        md:block 
        ${chatOpen ? "md:col-span-3" : "md:col-span-3"} 
        lg:col-span-2
      `}
        >
          <Content />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
