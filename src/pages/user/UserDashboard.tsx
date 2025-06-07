const UserDashboard = () => {
  return (
    <div>
      <h1>Hello, Dashboard!</h1>
      <div className="grid grid-cols-4">
        {/* left sidebar */}
        <div className="col-span-1 border-x-blue-300"></div>

        {/* content  */}
        <div className="col-span-2">
          {/* header  */}
          <div></div>

          {/* body  */}
          <div></div>

          {/* footer  */}
          <div></div>
        </div>

        {/* right sidebar  */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default UserDashboard;
