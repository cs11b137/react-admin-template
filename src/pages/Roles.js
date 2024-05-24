import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import {
  getRolesApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
} from "../services/api";
import MainLayout from "../layouts/MainLayout";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRolesApi();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCreateRole = async (values) => {
    try {
      await createRoleApi(values);
      fetchRoles();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleUpdateRole = async (values) => {
    try {
      await updateRoleApi(formValues.id, values);
      fetchRoles();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRoleApi(roleId);
      fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            }}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteRole(record.id)}
            style={{ marginLeft: "8px" }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1>Roles</h1>
        <Button
          type="primary"
          onClick={() => {
            setModalMode("create");
            setIsModalOpen(true);
          }}>
          Create Role
        </Button>
        <Table dataSource={roles} columns={columns} rowKey="id" />
      </div>
      <Modal
        title={modalMode === "create" ? "Create Role" : "Update Role"}
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (modalMode === "create") {
                handleCreateRole(values);
              } else {
                handleUpdateRole(values);
              }
            })
            .catch((err) => {
              console.error("Form validation error:", err);
            });
        }}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}>
        <Form form={form} initialValues={formValues} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default RolesPage;
