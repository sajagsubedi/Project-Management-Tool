import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description:String! 
    $status:ProjectStatus!
    $clientId:String!) {
    addProject(name:$name,description:$description,status:$status,clientId:$clientId) {
      id
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation editProject(
    $id:String!
    $name: String!
    $description:String! 
    $status:ProjectStatusUpdate!) {
    updateProject(
      id:$id, name:$name,description:$description,status:$status) {
      id
      name
      description
      status
      client{
        id
      }
    }
  }
`;
export {ADD_PROJECT, DELETE_PROJECT ,EDIT_PROJECT};
