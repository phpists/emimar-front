import { Pagination } from "../../../components/Pagination";
import { Header } from "./Header";
import { Row } from "./Row";

export const Table = () => {
  return (
    <div className="nk-block">
      <div className="card card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner p-0">
            <table className="nk-tb-list nk-tb-ulist">
              <thead>
                <Header />
              </thead>
              <tbody>
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};
