const { getDataConnect, queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gymbuddy-data-connect',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

function upsertUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
exports.upsertUserRef = upsertUserRef;
exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

function addUserGoalRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AddUserGoal', inputVars);
}
exports.addUserGoalRef = addUserGoalRef;
exports.addUserGoal = function addUserGoal(dcOrVars, vars) {
  return executeMutation(addUserGoalRef(dcOrVars, vars));
};

function upsertProgressRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpsertProgress', inputVars);
}
exports.upsertProgressRef = upsertProgressRef;
exports.upsertProgress = function upsertProgress(dcOrVars, vars) {
  return executeMutation(upsertProgressRef(dcOrVars, vars));
};

function addFriendRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AddFriend', inputVars);
}
exports.addFriendRef = addFriendRef;
exports.addFriend = function addFriend(dcOrVars, vars) {
  return executeMutation(addFriendRef(dcOrVars, vars));
};

function acceptFriendRequestRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'AcceptFriendRequest', inputVars);
}
exports.acceptFriendRequestRef = acceptFriendRequestRef;
exports.acceptFriendRequest = function acceptFriendRequest(dcOrVars, vars) {
  return executeMutation(acceptFriendRequestRef(dcOrVars, vars));
};

function getUserByEmailRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
exports.getUserByEmailRef = getUserByEmailRef;
exports.getUserByEmail = function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
};

function getPresetGoalsByLevelRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetPresetGoalsByLevel', inputVars);
}
exports.getPresetGoalsByLevelRef = getPresetGoalsByLevelRef;
exports.getPresetGoalsByLevel = function getPresetGoalsByLevel(dcOrVars, vars) {
  return executeQuery(getPresetGoalsByLevelRef(dcOrVars, vars));
};

function getUncompleteUserGoalsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUncompleteUserGoals', inputVars);
}
exports.getUncompleteUserGoalsRef = getUncompleteUserGoalsRef;
exports.getUncompleteUserGoals = function getUncompleteUserGoals(dcOrVars, vars) {
  return executeQuery(getUncompleteUserGoalsRef(dcOrVars, vars));
};

function getCompleteUserGoalsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetCompleteUserGoals', inputVars);
}
exports.getCompleteUserGoalsRef = getCompleteUserGoalsRef;
exports.getCompleteUserGoals = function getCompleteUserGoals(dcOrVars, vars) {
  return executeQuery(getCompleteUserGoalsRef(dcOrVars, vars));
};

function getUserProgressRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserProgress', inputVars);
}
exports.getUserProgressRef = getUserProgressRef;
exports.getUserProgress = function getUserProgress(dcOrVars, vars) {
  return executeQuery(getUserProgressRef(dcOrVars, vars));
};

function getAllRecipesRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetAllRecipes');
}
exports.getAllRecipesRef = getAllRecipesRef;
exports.getAllRecipes = function getAllRecipes(dc) {
  return executeQuery(getAllRecipesRef(dc));
};

function getUserFriendsRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetUserFriends', inputVars);
}
exports.getUserFriendsRef = getUserFriendsRef;
exports.getUserFriends = function getUserFriends(dcOrVars, vars) {
  return executeQuery(getUserFriendsRef(dcOrVars, vars));
};

function getFriendActivitiesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return queryRef(dcInstance, 'GetFriendActivities', inputVars);
}
exports.getFriendActivitiesRef = getFriendActivitiesRef;
exports.getFriendActivities = function getFriendActivities(dcOrVars, vars) {
  return executeQuery(getFriendActivitiesRef(dcOrVars, vars));
};

