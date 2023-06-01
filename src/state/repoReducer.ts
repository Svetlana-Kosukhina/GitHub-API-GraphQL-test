import actionTypes from "./actionTypes";
import { IAction, IState } from "../IProjectTypes";

const initialState: IState = {
  searchRepoArr: [],
  myRepoArr: [],
};

function repoReducer(state = initialState, action: IAction): IState {
  switch (action.type) {
    case actionTypes.GET_ALL_REPO: {
      return {
        ...state,
        searchRepoArr: action.payload,
      };
    }

    case actionTypes.GET_MY_REPO: {
      return {
        ...state,
        myRepoArr: action.payload,
      };
    }

    default:
      return state;
  }
}

export default repoReducer;
