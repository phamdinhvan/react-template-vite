import { someApirequest } from '@/services';
import { useQuery } from 'react-query';

//query key
export const ACTION_QUERY = 'actionQuery';

export default {
  ACTION_QUERY: (options?: any, fetchDataOptions?: any) => {
    return useQuery(
      [ACTION_QUERY],
      () => someApirequest(fetchDataOptions) as Promise<any>,
      options,
    );
  },
};
