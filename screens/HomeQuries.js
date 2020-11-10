import { gql } from "apollo-boost";

export const POST_MANY = gql`
  query postMany{
      postMany{
        id
        title
        Images{
        url
        }
      }
  
  }
`;
