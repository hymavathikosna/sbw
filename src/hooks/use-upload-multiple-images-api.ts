import { useMutation } from 'react-query';
import FetchUtils, { ErrorMessage } from 'utils/FetchUtils';
import { CollectionWrapper } from 'types';
import { UploadedImageResponse } from 'models/Image';
import NotifyUtils from 'utils/NotifyUtils';

function useUploadMultipleImagesApi() {
  return useMutation<CollectionWrapper<UploadedImageResponse>, ErrorMessage, File[]>(
    (images) => FetchUtils.uploadMultipleImages(images),
    {
      onSuccess: () => NotifyUtils.simpleSuccess('Image upload successful'),
      onError: () => NotifyUtils.simpleFailed('Image upload failed'),
    }
  );
}

export default useUploadMultipleImagesApi;
