import { useState } from "react";
import { Header } from "./Header/Header";
import { Table } from "../../Projects/Table/Table";

export const GroupList = () => {
  return (
    <div className="tab-pane fade show active">
      <Header />
      <Table />
    </div>
  );
};
