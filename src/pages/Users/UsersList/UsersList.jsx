import { Header } from "./Header/Header";
import { Table } from "./Table/Table";

export const UsersList = () => {
  return (
    <div className="tab-pane fade show active">
      <Header />
      <Table />
    </div>
  );
};
