export type IRepo = {
  stargazerCount: number;
  pushedAt: string;
  url: string;
  name: string;
  id: string;
  owner: IOwner;
  languages: {
    nodes: IOwner[];
  };
  description: string | null;
};

interface IOwner {
  [key: string]: string;
}

export type IState = {
  searchRepoArr: IRepo[];
  myRepoArr: IRepo[];
};

export type IAction = {
  type: string;
  payload: IRepo[];
};

export type IPagination = {
  currentPage: number;
  setCurrentPage(currentPage: number): void;
  pages: number;
};
