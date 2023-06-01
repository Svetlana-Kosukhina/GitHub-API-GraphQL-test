import actionTypes from './actionTypes';
import { IRepo } from "../IProjectTypes";

export function createActionGetAllRepo(payload: IRepo[]) {
  return {
    type: actionTypes.GET_ALL_REPO,
    payload,
  };
}

export function createActionGetMyRepo(payload: IRepo[]) {
  return {
    type: actionTypes.GET_MY_REPO,
    payload,
  };
}

