import {RequestStatusType} from "../Redux-Store/App-reducer";
import {TaskType} from "./TodolistTypes";

export type TaskTypeWithStatusEntity = TaskType & { entityTaskStatus: RequestStatusType };