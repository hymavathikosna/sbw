import { useForm, zodResolver } from '@mantine/form';
import JobTitleConfigs from 'pages/job-title/JobTitleConfigs';
import { JobTitleRequest, JobTitleResponse } from 'models/JobTitle';
import useCreateApi from 'hooks/use-create-api';
import { SelectOption } from 'types';

function useJobTitleCreateViewModel() {
  const form = useForm({
    initialValues: JobTitleConfigs.initialCreateUpdateFormValues,
    schema: zodResolver(JobTitleConfigs.createUpdateFormSchema),
  });

  const createApi = useCreateApi<JobTitleRequest, JobTitleResponse>(JobTitleConfigs.resourceUrl);

  const handleFormSubmit = form.onSubmit((formValues) => {
    const requestBody: JobTitleRequest = {
      name: formValues.name,
      status: Number(formValues.status),
    };
    createApi.mutate(requestBody);
  });

  const statusSelectList: SelectOption[] = [
    {
      value: '1',
      label: 'In effect',
    },
    {
      value: '2',
      label: 'Not in effect',
    },
  ];

  return {
    form,
    handleFormSubmit,
    statusSelectList,
  };
}

export default useJobTitleCreateViewModel;
