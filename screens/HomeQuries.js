import { gql } from "apollo-boost";

export const POST_MANY = gql`
  query postMany{
    postMany{
      id
      userName
      Images{
        url
      }
    }
  }
`;


export const POST_ONE = gql`
  query postOne($id:String!){
    postOne(id:$id){
      id
      userAvatar
      userName
      timeFromToday
      title
      subscriberCount
      Images{
        url
      }
    }
  }
`;

