import {TaskType} from "../api/todolists-api";
import {RequestStatusType} from "../Redux-Store/App-reducer";

export type TaskTypeWithStatusEntity = TaskType & { entityTaskStatus: RequestStatusType };