/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
  setUser,
} from "../redux/features/auth/authSlice";
import userApi from "../redux/features/user/userApi";

const { TextArea } = Input;

export default function EditProfileModal() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const [updateProfile, { isLoading }] = userApi.useUpdateUserMutation();

  // Populate form when modal opens
  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        name: user.name,
        bio: user.bio,
        file: [],
      });
    }
  }, [visible, user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Build FormData
      const formData = new FormData();
      const payload = {
        name: values.name,
        bio: values.bio || "",
      };
      formData.append("data", JSON.stringify(payload));

      // Pull real File from Upload
      const fileList = values.file as any[];
      if (fileList?.length) {
        const fileObj = fileList[0].originFileObj as File;
        formData.append("file", fileObj);
      }

      // Send to backend
      const res = await updateProfile(formData).unwrap();

      // Update redux
      dispatch(setUser({ user: res.data, token: token }));
      message.success("Profile updated!");
      setVisible(false);
    } catch (err: any) {
      message.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Edit Profile
      </Button>

      <Modal
        title="Edit Profile"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
        confirmLoading={isLoading}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input size="large" />
          </Form.Item>

          {/* Email*/}
          <Form.Item label="Email">
            <Input size="large" disabled value={user?.email} />
          </Form.Item>

          {/* Bio */}
          <Form.Item label="Bio" name="bio">
            <TextArea rows={4} />
          </Form.Item>

          {/* Profile Image Upload */}
          <Form.Item
            label="Profile Image"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Choose Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
