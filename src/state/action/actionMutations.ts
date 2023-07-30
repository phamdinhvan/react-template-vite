import generalApi from '@/utils/generalApi';
import { useMutation } from 'react-query';

export default {
  ACTION_MUTATION: () =>
    useMutation<any>((data: any) => {
      try {
        return generalApi.create_json({
          //request route
          routeName: '',
          url_params: {},
          data: data,
        });
      } catch (e: any) {
        throw new Error(e.toString());
      }
    }),
};
