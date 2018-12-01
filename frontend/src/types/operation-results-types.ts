/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getUserEnsemblesQuery {
  userEnsembles:  {
    ensembles:  Array< {
      id: string,
      name: string | null,
    } >,
  } | null,
};

export interface createAdminUserMutationVariables {
  password: string,
};

export interface createAdminUserMutation {
  createAdminUser:  {
    success: boolean | null,
    viewer:  {
      hasSystemAdminUser: boolean,
    } | null,
  } | null,
};

export interface loginMutationVariables {
  userName: string,
  password: string,
};

export interface loginMutation {
  login:  {
    success: boolean | null,
    viewer:  {
      user:  {
        id: string | null,
        name: string | null,
      } | null,
    },
  } | null,
};

export interface getPageViewerQuery {
  viewer:  {
    user:  {
      id: string | null,
      name: string | null,
    } | null,
    hasSystemAdminUser: boolean,
  },
};
