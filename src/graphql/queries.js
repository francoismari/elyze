/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProposition = /* GraphQL */ `
  query GetProposition($id: ID!) {
    getProposition(id: $id) {
      id
      idCandidat
      idTheme
      source
      title
      toBeShownFirst
      toShowOnSwipe
      firstPropositions
      createdAt
      updatedAt
      articleContent
    }
  }
`;
export const listPropositions = /* GraphQL */ `
  query ListPropositions(
    $filter: ModelPropositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPropositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idCandidat
        idTheme
        source
        title
        toBeShownFirst
        toShowOnSwipe
        firstPropositions
        createdAt
        updatedAt
        articleContent
      }
      nextToken
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      id
      postalCode
      haveVoted
      haveVotedFor
      willVoteFor
      dayBirth
      monthBirth
      yearBirth
      genre
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postalCode
        haveVoted
        haveVotedFor
        willVoteFor
        dayBirth
        monthBirth
        yearBirth
        genre
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getSwipeStat = /* GraphQL */ `
  query GetSwipeStat($id: ID!) {
    getSwipeStat(id: $id) {
      id
      titleProposition
      idCandidat
      rating
      postalCode
      idProposition
      idUser
      haveVotedFor
      willVoteFor
      osVersion
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSwipeStats = /* GraphQL */ `
  query ListSwipeStats(
    $filter: ModelSwipeStatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSwipeStats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        titleProposition
        idCandidat
        rating
        postalCode
        idProposition
        idUser
        haveVotedFor
        willVoteFor
        osVersion
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
