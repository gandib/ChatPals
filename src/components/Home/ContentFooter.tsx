import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { Button, message as antdMessage } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef } from "react";

const ContentFooter = ({
  setText,
  text,
  sendMessage,
  imageFile,
  setImageFile,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  sendMessage: () => void;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        antdMessage.error("Only image files are allowed.");
        return;
      }
      setImageFile(file);
    }
  };

  return (
    <div className="flex items-center h-[10vh] border border-t-0 border-x-gray-200 border-y-0 px-4">
      {/* Image upload button */}
      <div
        className="rounded-full p-2 px-3 bg-gray-300 cursor-pointer"
        onClick={handleImageClick}
      >
        <PictureOutlined />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Text input */}
      <div className="w-full mx-4">
        <TextArea
          size="small"
          className="bg-gray-100"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Type a message..."
        />
      </div>

      {/* Send button */}
      <Button
        type="primary"
        disabled={!text && !imageFile}
        onClick={sendMessage}
        icon={<SendOutlined />}
      />
    </div>
  );
};

export default ContentFooter;
