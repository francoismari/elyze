/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProposition = /* GraphQL */ `
  mutation CreateProposition(
    $input: CreatePropositionInput!
    $condition: ModelPropositionConditionInput
  ) {
    createProposition(input: $input, condition: $condition) {
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
export const updateProposition = /* GraphQL */ `
  mutation UpdateProposition(
    $input: UpdatePropositionInput!
    $condition: ModelPropositionConditionInput
  ) {
    updateProposition(input: $input, condition: $condition) {
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
export const deleteProposition = /* GraphQL */ `
  mutation DeleteProposition(
    $input: DeletePropositionInput!
    $condition: ModelPropositionConditionInput
  ) {
    deleteProposition(input: $input, condition: $condition) {
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
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
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
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
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
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
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
export const createSwipeStat = /* GraphQL */ `
  mutation CreateSwipeStat(
    $input: CreateSwipeStatInput!
    $condition: ModelSwipeStatConditionInput
  ) {
    createSwipeStat(input: $input, condition: $condition) {
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
export const updateSwipeStat = /* GraphQL */ `
  mutation UpdateSwipeStat(
    $input: UpdateSwipeStatInput!
    $condition: ModelSwipeStatConditionInput
  ) {
    updateSwipeStat(input: $input, condition: $condition) {
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
export const deleteSwipeStat = /* GraphQL */ `
  mutation DeleteSwipeStat(
    $input: DeleteSwipeStatInput!
    $condition: ModelSwipeStatConditionInput
  ) {
    deleteSwipeStat(input: $input, condition: $condition) {
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
