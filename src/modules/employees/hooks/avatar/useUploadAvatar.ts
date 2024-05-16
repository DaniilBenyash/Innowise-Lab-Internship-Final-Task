import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { USERS_QUERY, USER_QUERY } from "modules/employees/hooks";

const UPLOADING_AVATAR = gql`
  mutation uploadAvatar($id: ID!, $avatar: AvatarInput!) {
    uploadAvatar(id: $id, avatar: $avatar)
  }
`;

export type Avatar = {
  base64: string;
  size: number;
  type: string;
};

const useUploadAvatar = () => {
  const [sendRequest, { loading }] = useMutation(UPLOADING_AVATAR, {
    refetchQueries: [USERS_QUERY, USER_QUERY],
  });

  const handleUploadAvatar = (id: string, avatar: Avatar) => {
    sendRequest({
      variables: { id, avatar },
    });
  };
  return { handleUploadAvatar, loading };
};

export { useUploadAvatar };
