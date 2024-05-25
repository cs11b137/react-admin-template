import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userActions";
import { Table, Button, Modal, Form, Input } from "antd";
import { createUserApi, updateUserApi, deleteUserApi } from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { hasPermission } from "../utils/authUtils";
import { permissions } from "../utils/permissions";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (hasPermission(user, permissions.MANAGE_USERS)) {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  const canManageUsers = hasPermission(user, permissions.MANAGE_USERS);

  if (!canManageUsers) {
    return (
      <MainLayout>
        <div>
          <h1>无权访问</h1>
          <p>您没有管理用户的权限。</p>
        </div>
      </MainLayout>
    );
  }

  const handleCreateUser = async (values) => {
    try {
      //const values = await form.validateFields();
      await createUserApi(values);
      fetchUsers();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      await updateUserApi(formValues.id, values);
      fetchUsers();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserApi(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setFormValues(record);
              setModalMode("update");
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteUser(record.id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1>Users</h1>
        {/* 根据 loading 状态显示加载中或错误信息 */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <Button
          type="primary"
          onClick={() => {
            setModalMode("create");
            setIsModalOpen(true);
          }}
        >
          Create User
        </Button>
        <Table dataSource={users} columns={columns} rowKey="id" />
      </div>
      <Modal
        title={modalMode === "create" ? "Create User" : "Update User"}
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (modalMode === "create") {
                handleCreateUser(values);
              } else {
                handleUpdateUser(values);
              }
            })
            .catch((err) => {
              console.error("Form validation error:", err);
            });
        }}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
      >
        <Form form={form} initialValues={formValues} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default UsersPage;
