import Content from "../components/Home/Content";
import LeftSidebar from "../components/Home/LeftSidebar";
import RightSidebar from "../components/Home/RightSidebar";

const Home = () => {
  return (
    <div className="">
      <div className="grid grid-cols-4">
        {/* left sidebar */}
        <div className="col-span-1 ">
          <LeftSidebar />
        </div>

        {/* content  */}
        <div className="col-span-2 border-x border-x-blue-300  ">
          <Content />
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
