import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      // keep fresh for 10 mins
      // cache broken with progress bar
      keepPreviousData: true,
      // cacheTime: 0
    },
  },
});

// Define all watchers
// watcherAuth(queryClient);

export default queryClient;
