import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query MyQuery2 {
    todolist {
      id
      is_done
      title
    }
  }
`;

export const GET_DATA_SUBS = gql`
  subscription MySubscription {
    todolist {
      id
      is_done
      title
    }
  }
`;

export const GETDATA_BY_ID_INPUT = gql`
  query MyQuery($id: Int!) {
    todolist_by_pk(id: $id) {
      id
      title
      is_done
    }
  }
`;

export const INSERT_DATA = gql`
    mutation MyMutation3($object: todolist_insert_input!) {
        insert_todolist_one(object: $object) {
            id
            is_done
            title
        }
    }
`

export const UPDATE_DATA = gql`
    mutation MyMutation($id: Int!, $status: Boolean) {
        update_todolist_by_pk(pk_columns: {id: $id}, _set: {is_done: $status}) {
            id
            title
            is_done
        }
    }
`;

export const DELETE_DATA = gql`
    mutation MyMutation2($id: Int!) {
        delete_todolist_by_pk(id: $id) {
            id
            is_done
            title
        }
    }
`;