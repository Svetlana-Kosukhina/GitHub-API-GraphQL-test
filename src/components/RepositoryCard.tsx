import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { IState } from "../IProjectTypes";

function RepositoryCard() {
  const { id } = useParams();

  const { searchRepoArr, myRepoArr } = useSelector((state: IState) => state);
  const concatArr = searchRepoArr.concat(myRepoArr);
  const finedRepo = concatArr.find((item) => item.id === id);

  return (
    <>
      <Link to="/" className="link">
        <button className="btn-main-page"> To Main Page</button>
      </Link>
      <div className="card">
        <h2>Repositories name: {finedRepo?.name}</h2>
        <h5>Stars: {finedRepo?.stargazerCount}</h5>
        <h4>Last Commit: {finedRepo?.pushedAt}</h4>
        <a href={finedRepo?.url}>{finedRepo?.url}</a>
        <div className="card-more">
          <div className="card-owner">
            <a href={finedRepo?.owner.url}>
            <img src={finedRepo?.owner.avatarUrl} />
              <p>{finedRepo?.owner.login}</p>
            </a>
          </div>
          <div className="card-languages">
            <h4>Languages:</h4>
            {finedRepo?.languages.nodes.length ? (
              finedRepo?.languages.nodes.map((language) => (
                <span key={language.name}>- {language.name}</span>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
        <div>
          <h3>Description:</h3>
          {finedRepo?.description ? (
            <p>{finedRepo?.description}</p>
          ) : (
            <span>None</span>
          )}
        </div>
      </div>
    </>
  );
}

export default RepositoryCard;
