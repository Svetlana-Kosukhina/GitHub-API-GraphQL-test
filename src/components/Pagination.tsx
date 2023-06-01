import classNames from "classnames";

import { IPagination } from "../IProjectTypes";

function Pagination({ currentPage, setCurrentPage, pages }: IPagination) {
  const paginationArr: number[] = [];
  for (let i = 1; i <= pages; i++) {
    paginationArr.push(i);
  }

  return (
    <ul className="pagination-wrapper">
      {paginationArr.map((item) => {
        const isActive = item === currentPage;
        const paginationStyle = classNames({
          active: isActive,
          pagination: !isActive,
        });
        return (
          <li className={paginationStyle} key={item}>
            <button onClick={() => setCurrentPage(item)}>{item}</button>
          </li>
        );
      })}
    </ul>
  );
}

export default Pagination;
