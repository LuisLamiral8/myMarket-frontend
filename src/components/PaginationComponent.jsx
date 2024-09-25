import React from "react";
import { Pagination } from "react-bootstrap";
import styles from "./styles/pagination.module.scss";
const PaginationComponent = ({ totalPages, page, setPage }) => {
  return (
    <Pagination size="sm" className={styles.container}>
      <Pagination.First onClick={() => setPage(1)} />
      <Pagination.Prev onClick={() => setPage(Math.max(page - 1, 1))} />

      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          className={page === index + 1 ? styles.active : ""}
          key={index + 1}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setPage(Math.min(page + 1, totalPages))}
      />
      <Pagination.Last onClick={() => setPage(totalPages)} />
    </Pagination>
  );
};

export default PaginationComponent;
