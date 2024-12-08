import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface AcceptFriendRequestData {
  friends_update?: Friends_Key | null;
}

export interface AcceptFriendRequestVariables {
  userEmail: string;
  friendEmail: string;
}

export interface AddFriendData {
  friends_insert: Friends_Key;
}

export interface AddFriendVariables {
  userEmail: string;
  friendEmail: string;
}

export interface AddUserGoalData {
  userGoal_insert: UserGoal_Key;
}

export interface AddUserGoalVariables {
  email: string;
  goalType: string;
  goalPoints: number;
  goalText?: string | null;
}

export interface Friends_Key {
  user1Email: string;
  user2Email: string;
  __typename?: 'Friends_Key';
}

export interface GetAllRecipesData {
  recipes: ({
    id: UUIDString;
    name: string;
    type?: string | null;
    calories?: number | null;
    instructions?: string | null;
  } & Recipe_Key)[];
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

export interface GetFriendActivitiesData {
  friendss: ({
    user1: {
      id: UUIDString;
    };
      user2: {
        id: UUIDString;
      };
  })[];
}

export interface GetFriendActivitiesVariables {
  userId: UUIDString;
}

export interface GetPresetGoalsByLevelData {
  presetGoals: ({
    goalType: string;
    goalText?: string | null;
    goalPoints: number;
  })[];
}

export interface GetPresetGoalsByLevelVariables {
  lvlReq: number;
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

export interface GetUserFriendsData {
  friendss: ({
    user1: {
      id: UUIDString;
      username: string;
    };
      user2: {
        id: UUIDString;
        username: string;
      };
        status?: string | null;
  })[];
}

export interface GetUserFriendsVariables {
  userId: UUIDString;
}

export interface GetUserProgressData {
  user?: {
    userProgress_on_user?: {
      progress: number;
      dailyGoalsCompleted?: number | null;
      weeklyGoalsCompleted?: number | null;
      monthlyGoalsCompleted?: number | null;
      totalGoalsCompleted?: number | null;
    };
  };
}

export interface GetUserProgressVariables {
  keyEmail: string;
}

export interface PresetGoal_Key {
  id: UUIDString;
  __typename?: 'PresetGoal_Key';
}

export interface Recipe_Key {
  id: UUIDString;
  __typename?: 'Recipe_Key';
}

export interface UpsertProgressData {
  userProgress_upsert: UserProgress_Key;
}

export interface UpsertProgressVariables {
  email: string;
  progress?: number | null;
  dailyGoalsCompleted?: number | null;
  weeklyGoalsCompleted?: number | null;
  monthlyGoalsCompleted?: number | null;
  totalGoalsCompleted?: number | null;
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
  id: UUIDString;
  userEmail: string;
  __typename?: 'UserGoal_Key';
}

export interface UserProgress_Key {
  userEmail: string;
  __typename?: 'UserProgress_Key';
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
export function getPresetGoalsByLevelRef(vars: GetPresetGoalsByLevelVariables): QueryRef<GetPresetGoalsByLevelData, GetPresetGoalsByLevelVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getPresetGoalsByLevelRef(dc: DataConnect, vars: GetPresetGoalsByLevelVariables): QueryRef<GetPresetGoalsByLevelData,GetPresetGoalsByLevelVariables>;

export function getPresetGoalsByLevel(vars: GetPresetGoalsByLevelVariables): QueryPromise<GetPresetGoalsByLevelData, GetPresetGoalsByLevelVariables>;
export function getPresetGoalsByLevel(dc: DataConnect, vars: GetPresetGoalsByLevelVariables): QueryPromise<GetPresetGoalsByLevelData,GetPresetGoalsByLevelVariables>;


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


/* Allow users to create refs without passing in DataConnect */
export function getUserProgressRef(vars: GetUserProgressVariables): QueryRef<GetUserProgressData, GetUserProgressVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserProgressRef(dc: DataConnect, vars: GetUserProgressVariables): QueryRef<GetUserProgressData,GetUserProgressVariables>;

export function getUserProgress(vars: GetUserProgressVariables): QueryPromise<GetUserProgressData, GetUserProgressVariables>;
export function getUserProgress(dc: DataConnect, vars: GetUserProgressVariables): QueryPromise<GetUserProgressData,GetUserProgressVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getAllRecipesRef(): QueryRef<GetAllRecipesData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getAllRecipesRef(dc: DataConnect): QueryRef<GetAllRecipesData,undefined>;

export function getAllRecipes(): QueryPromise<GetAllRecipesData, undefined>;
export function getAllRecipes(dc: DataConnect): QueryPromise<GetAllRecipesData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getUserFriendsRef(vars: GetUserFriendsVariables): QueryRef<GetUserFriendsData, GetUserFriendsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserFriendsRef(dc: DataConnect, vars: GetUserFriendsVariables): QueryRef<GetUserFriendsData,GetUserFriendsVariables>;

export function getUserFriends(vars: GetUserFriendsVariables): QueryPromise<GetUserFriendsData, GetUserFriendsVariables>;
export function getUserFriends(dc: DataConnect, vars: GetUserFriendsVariables): QueryPromise<GetUserFriendsData,GetUserFriendsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getFriendActivitiesRef(vars: GetFriendActivitiesVariables): QueryRef<GetFriendActivitiesData, GetFriendActivitiesVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getFriendActivitiesRef(dc: DataConnect, vars: GetFriendActivitiesVariables): QueryRef<GetFriendActivitiesData,GetFriendActivitiesVariables>;

export function getFriendActivities(vars: GetFriendActivitiesVariables): QueryPromise<GetFriendActivitiesData, GetFriendActivitiesVariables>;
export function getFriendActivities(dc: DataConnect, vars: GetFriendActivitiesVariables): QueryPromise<GetFriendActivitiesData,GetFriendActivitiesVariables>;


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
export function upsertProgressRef(vars: UpsertProgressVariables): MutationRef<UpsertProgressData, UpsertProgressVariables>;
/* Allow users to pass in custom DataConnect instances */
export function upsertProgressRef(dc: DataConnect, vars: UpsertProgressVariables): MutationRef<UpsertProgressData,UpsertProgressVariables>;

export function upsertProgress(vars: UpsertProgressVariables): MutationPromise<UpsertProgressData, UpsertProgressVariables>;
export function upsertProgress(dc: DataConnect, vars: UpsertProgressVariables): MutationPromise<UpsertProgressData,UpsertProgressVariables>;


/* Allow users to create refs without passing in DataConnect */
export function addFriendRef(vars: AddFriendVariables): MutationRef<AddFriendData, AddFriendVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addFriendRef(dc: DataConnect, vars: AddFriendVariables): MutationRef<AddFriendData,AddFriendVariables>;

export function addFriend(vars: AddFriendVariables): MutationPromise<AddFriendData, AddFriendVariables>;
export function addFriend(dc: DataConnect, vars: AddFriendVariables): MutationPromise<AddFriendData,AddFriendVariables>;


/* Allow users to create refs without passing in DataConnect */
export function acceptFriendRequestRef(vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData, AcceptFriendRequestVariables>;
/* Allow users to pass in custom DataConnect instances */
export function acceptFriendRequestRef(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationRef<AcceptFriendRequestData,AcceptFriendRequestVariables>;

export function acceptFriendRequest(vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData, AcceptFriendRequestVariables>;
export function acceptFriendRequest(dc: DataConnect, vars: AcceptFriendRequestVariables): MutationPromise<AcceptFriendRequestData,AcceptFriendRequestVariables>;


