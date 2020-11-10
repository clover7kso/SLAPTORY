import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation signIn($id: String!, $password: String!) {
    signIn(id: $id, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation signUp($id: String!, $password: String!, $name:String!, $phone:String! ){
    signUp(id: $id, password: $password, name:$name, phone:$phone)
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
