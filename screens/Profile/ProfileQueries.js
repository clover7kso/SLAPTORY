import { gql } from "apollo-boost";

export const USER_ONE = gql`
  query {
    userOne {
      id
      avatar
      name
    }
  }
`;

export const MY_COMMENT = gql`
  query {
    myComment {
      postId
      timeFromToday
      postTitle
      text
    }
  }
`;

export const MY_MARKETING = gql`
  query {
    myMarketing {
      product {
        id
        title
        content
        company
        sampleImages {
          url
        }
      }
    }
  }
`;

export const MY_PRODUCT = gql`
  query {
    myProduct {
      product {
        id
        title
        content
        company
        sampleImages {
          url
        }
      }
    }
  }
`;

export const MY_POST = gql`
  query {
    myPost {
      id
      title
      content
      views
      timeFromToday
      commentCount
      userName
    }
  }
`;

export const AVATAR_EDIT = gql`
  mutation avatarEdit($avatar: String) {
    avatarEdit(avatar: $avatar)
  }
`;
