import React from "react";
import MainLayout from "../layouts/MainLayout";

const UnauthorizedPage = () => {
  return (
    <MainLayout>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </MainLayout>
  );
};

export default UnauthorizedPage;
