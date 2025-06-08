import ContentBody from "./ContentBody";
import ContentFooter from "./ContentFooter";
import ContentHeader from "./ContentHeader";

const Content = () => {
  return (
    <div>
      {/* header  */}
      <div>
        <ContentHeader />
      </div>

      {/* body  */}
      <div>
        <ContentBody />
      </div>

      {/* footer  */}
      <div>
        <ContentFooter />
      </div>
    </div>
  );
};

export default Content;
