import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";

import {
  createActionGetAllRepo,
  createActionGetMyRepo,
} from "../state/repoActions";
import getAllRepo from "../api/getAllRepo";
import getMyRepo from "../api/getMyRepo";
import { IState, IRepo } from "../IProjectTypes";

function MainPage() {
  const dispatch = useDispatch();
  const repoLimit = 10;
  const [loading, setLoading] = useState(false);
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginArr, setPaginArr] = useState<IRepo[]>([]);
  const { searchRepoArr, myRepoArr } = useSelector((state: IState) => state);
  const showArr = searchValue === "" ? myRepoArr : searchRepoArr;
  const pages = Math.ceil(showArr.length / repoLimit);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);
      getAllRepo(searchValue)
        .then((res) => {
          const responseArr = res.data.search.nodes;
          dispatch(createActionGetAllRepo(responseArr));
          setLoading(false);
          setRepoNotFound(responseArr.length === 0);
        })
        .catch(() => {
          setLoading(false);
          setRepoNotFound(true);
        });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, dispatch]);

  useEffect(() => {
    if (!(searchValue === "" && currentPage === 1)) {
      localStorage.setItem("searchValue", JSON.stringify(searchValue));
      localStorage.setItem("currentPage", JSON.stringify(currentPage));
    }
  }, [searchValue, currentPage]);

  useEffect(() => {
    setLoading(true);
    getMyRepo()
      .then((res) => {
        const responseArr = res.data.viewer.repositories.nodes;
        dispatch(createActionGetMyRepo(responseArr));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setRepoNotFound(true);
      });
  }, [dispatch]);

  useEffect(() => {
    const localSearchValue = localStorage.getItem("searchValue");
    const localCurrentPage = localStorage.getItem("currentPage");
    if (localSearchValue) {
      setSearchValue(JSON.parse(localSearchValue));
    }
    if (localCurrentPage) {
      setCurrentPage(JSON.parse(localCurrentPage));
    }
  }, []);

  useEffect(() => {
    if (currentPage > pages && pages !== 0) setCurrentPage(pages);
    const start = (currentPage - 1) * repoLimit;
    const end = start + repoLimit;
    setPaginArr(showArr.slice(start, end));
  }, [showArr, currentPage, pages]);

  return (
    <div className="main-page">
      <input
        placeholder="Please, enter repositories name"
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
      />
      {loading ? (
        <h2 className="loading">LOADING...</h2>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
          {repoNotFound && searchValue && (
            <div className="error-message">Nothing found for your request</div>
          )}
          <ul className="list">
            {paginArr.map((item) => (
              <li className="repo-card" key={item.id}>
                <Link to={`/${item.id}`} className="link">
                  <h3>Repositories name: {item.name}</h3>
                </Link>
                <h5>Stars: {item.stargazerCount}</h5>
                <h4>Last Commit: {item.pushedAt}</h4>
                <a href={item.url}>{item.url}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MainPage;
