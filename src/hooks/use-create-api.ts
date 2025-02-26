import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import NotifyUtils from 'utils/NotifyUtils';

function useCreateApi<I, O>(resourceUrl: string) {
  return useMutation<O, ErrorMessage, I>(
    (requestBody) => FetchUtils.create<I, O>(resourceUrl, requestBody),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Created successfully'),
      onError: () => NotifyUtils.simpleFailed('Creation failed'),
    }
  );
}

export default useCreateApi;
