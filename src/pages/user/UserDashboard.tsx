import { Card, Avatar, Descriptions } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import EditProfileModal from "../../components/EditProfileModal";

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  return (
    <div className="mx-auto p-2 md:p-6">
      <Card
        className="rounded-2xl shadow-lg min-h-[90vh] flex flex-col"
        style={{ padding: "2rem", flex: 1 }}
        extra={<EditProfileModal />}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
          <Avatar
            size={128}
            src={user.image}
            className="ring-4 ring-blue-100"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <Descriptions
              column={1}
              size="middle"
              labelStyle={{ fontWeight: 500, color: "#4B5563" }}
              contentStyle={{ color: "#1F2937" }}
            >
              <Descriptions.Item label="Bio">
                {user.bio || (
                  <span className="italic text-gray-400">No bio provided.</span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
