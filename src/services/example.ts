import generalApi from '@/utils/generalApi';

export const someApirequest = async (action: any) => {
  return await generalApi
    .create_json({
      data: {
        action: action,
      },
      //request route
      routeName: '',
    })
    .then((response) => {
      return response.data?.data ?? response.data?.message;
    })
    .catch((error) => {
      return error;
    });
};
