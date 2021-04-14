import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { homePageEditTranslations } from '../../translations/home-page-edit.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const getHomePageLooksImages = async () => {
  const result = await client.query({
    query: gql`
      query {
        getHomePageLooksImages {
          _id
          images {
            small
          }
        }
      }
    `
  });

  client.stop();
  await client.resetStore();

  const { data } = result;
  return data.getHomePageLooksImages;
};

const updateHomePageLooksImage = async (id, upload) => {
  const result = await client.mutate({
    variables: {
      id,
      upload
    },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!, $upload: Upload) {
        updateHomePageLooksImage(id: $id, images: $upload) {
          ... on HomePageImages {
            images {
              small
            }
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  await client.resetStore();

  const { data } = result;

  if (data.updateHomePageLooksImage.message) {
    throw new Error(
      `${data.updateHomePageLooksImage.statusCode} ${
        homePageEditTranslations[data.updateHomePageLooksImage.message]
      }`
    );
  }

  return data.updateHomePageLooksImage;
};

export { getHomePageLooksImages, updateHomePageLooksImage };
