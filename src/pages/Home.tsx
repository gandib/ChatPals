import { useState } from "react";
import Content from "../components/Home/Content";
import LeftSidebar from "../components/Home/LeftSidebar";
import RightSidebar from "../components/Home/RightSidebar";

const Home = () => {
  const [receiverId, setReceiverId] = useState("");
  return (
    <div className="mx-0 top-16 right-0 left-0 fixed min-h-[90vh]">
      <div className="grid grid-cols-4">
        {/* left sidebar */}
        <div className="col-span-1 ">
          <LeftSidebar setReceiverId={setReceiverId} />
        </div>

        {/* content  */}
        <div className="col-span-2">
          <Content receiverId={receiverId} />
        </div>

        {/* right sidebar  */}
        <div className="col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
