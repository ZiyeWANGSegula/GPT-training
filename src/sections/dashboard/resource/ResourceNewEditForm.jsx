import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
// resource services
import { resourceService } from '../../../_services/resource.service';

// ----------------------------------------------------------------------

ResourceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentResource: PropTypes.object,
};

export default function ResourceNewEditForm({ isEdit = false, currentResource }) {
  console.log("current " + currentResource);
  const categories = ['CRASH', 'OPENROAD']
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewResourceSchema = Yup.object().shape({
    lib: Yup.string().required('Label is required'),
    cat: Yup.string().required('Category is required'),
    place: Yup.string().required('Place is required'),
  });

  const defaultValues = useMemo(
    () => ({
      lib: currentResource?.lib || '',
      cat: currentResource?.cat || '',
      place: currentResource?.place || '',
    }),
    [currentResource]
  );

  const methods = useForm({
    resolver: yupResolver(NewResourceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentResource) {
      
      reset(defaultValues);
    }
    if (!isEdit) {
      
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentResource]);

  const onSubmit = async (data) => {
    try {
      if (isEdit && currentResource) {
        //updata method needs resource id
        data.id = currentResource.id;
        resourceService.updateResource(data)
          .then(res => {
            navigate(PATH_DASHBOARD.resource.list)
            enqueueSnackbar('Resource updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        resourceService.addResource(data)
          .then(res => {
            navigate(PATH_DASHBOARD.resource.list)
            enqueueSnackbar('Resource added successfully');
          })
          .catch(err => console.log(err))

      }
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="lib" label="Label" />
              <RHFTextField name="place" label="Place" />
              <RHFSelect native name="cat" label="Category" placeholder="Categories">
                <option value="" />
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Facility' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
