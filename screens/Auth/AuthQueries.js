import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;

export const CHECK_ID = gql`
  mutation checkId($id: String!){
    checkId(id: $id)
  }
`;

export const PHONE_CHECK = gql`
  mutation phoneCheck($phoneNumber: String!, $checkNumber: String!) {
    phoneCheck(phoneNumber: $phoneNumber, checkNumber: $checkNumber)
  }
`;


export const PHONE_REQUEST = gql`
  mutation phoneRequest($phoneNumber: String!) {
    phoneRequest(phoneNumber: $phoneNumber)
  }
`;
