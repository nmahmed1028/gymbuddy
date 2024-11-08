import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface AddUserGoalData {
  userGoal_insert: UserGoal_Key;
}

export interface AddUserGoalVariables {
  email: string;
  goalType: string;
  goalPoints: number;
  goalText?: string | null;
}

export interface GetCompleteUserGoalsData {
  dailyGoals: ({
    id: UUIDString;
    goalType: string;
    goalText?: string | null;
    goalPoints: number;
  })[];
    weeklyGoals: ({
      id: UUIDString;
      goalType: string;
      goalText?: string | null;
      goalPoints: number;
    })[];
      mothlyGoals: ({
        id: UUIDString;
        goalType: string;
        goalText?: string | null;
        goalPoints: number;
      })[];
}

export interface GetCompleteUserGoalsVariables {
  email: string;
}

export interface GetUncompleteUserGoalsData {
  dailyGoals: ({
    id: UUIDString;
    goalType: string;
    goalText?: string | null;
    goalPoints: number;
  })[];
    weeklyGoals: ({
      id: UUIDString;
      goalType: string;
      goalText?: string | null;
      goalPoints: number;
    })[];
      mothlyGoals: ({
        id: UUIDString;
        goalType: string;
        goalText?: string | null;
        goalPoints: number;
      })[];
}

export interface GetUncompleteUserGoalsVariables {
  email: string;
}

export interface GetUserByEmailData {
  user?: {
    email: string;
    id: UUIDString;
    username: string;
    displayname?: string | null;
  } & User_Key;
}

export interface GetUserByEmailVariables {
  keyEmail: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  email: string;
  username: string;
  displayname?: string | null;
}

export interface UserGoal_Key {
  userEmail: string;
  __typename?: 'UserGoal_Key';
}

export interface User_Key {
  email: string;
  __typename?: 'User_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function upsertUserRef(vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function upsertUserRef(dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData,UpsertUserVariables>;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData,UpsertUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function addUserGoalRef(vars: AddUserGoalVariables): MutationRef<AddUserGoalData, AddUserGoalVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addUserGoalRef(dc: DataConnect, vars: AddUserGoalVariables): MutationRef<AddUserGoalData,AddUserGoalVariables>;

export function addUserGoal(vars: AddUserGoalVariables): MutationPromise<AddUserGoalData, AddUserGoalVariables>;
export function addUserGoal(dc: DataConnect, vars: AddUserGoalVariables): MutationPromise<AddUserGoalData,AddUserGoalVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserByEmailRef(vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserByEmailRef(dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData,GetUserByEmailVariables>;

export function getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData,GetUserByEmailVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUncompleteUserGoalsRef(vars: GetUncompleteUserGoalsVariables): QueryRef<GetUncompleteUserGoalsData, GetUncompleteUserGoalsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUncompleteUserGoalsRef(dc: DataConnect, vars: GetUncompleteUserGoalsVariables): QueryRef<GetUncompleteUserGoalsData,GetUncompleteUserGoalsVariables>;

export function getUncompleteUserGoals(vars: GetUncompleteUserGoalsVariables): QueryPromise<GetUncompleteUserGoalsData, GetUncompleteUserGoalsVariables>;
export function getUncompleteUserGoals(dc: DataConnect, vars: GetUncompleteUserGoalsVariables): QueryPromise<GetUncompleteUserGoalsData,GetUncompleteUserGoalsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getCompleteUserGoalsRef(vars: GetCompleteUserGoalsVariables): QueryRef<GetCompleteUserGoalsData, GetCompleteUserGoalsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getCompleteUserGoalsRef(dc: DataConnect, vars: GetCompleteUserGoalsVariables): QueryRef<GetCompleteUserGoalsData,GetCompleteUserGoalsVariables>;

export function getCompleteUserGoals(vars: GetCompleteUserGoalsVariables): QueryPromise<GetCompleteUserGoalsData, GetCompleteUserGoalsVariables>;
export function getCompleteUserGoals(dc: DataConnect, vars: GetCompleteUserGoalsVariables): QueryPromise<GetCompleteUserGoalsData,GetCompleteUserGoalsVariables>;


