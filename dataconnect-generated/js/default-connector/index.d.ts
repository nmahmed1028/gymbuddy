import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface AddUserGoalData {
  userGoals_insert: UserGoals_Key;
}

export interface AddUserGoalVariables {
  email: string;
  goalType: string;
  goalPoints: number;
  goalText?: string | null;
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

export interface UserGoals_Key {
  userEmail: string;
  __typename?: 'UserGoals_Key';
}

export interface User_Key {
  email: string;
  __typename?: 'User_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function getUserByEmailRef(vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserByEmailRef(dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData,GetUserByEmailVariables>;

export function getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData,GetUserByEmailVariables>;


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


