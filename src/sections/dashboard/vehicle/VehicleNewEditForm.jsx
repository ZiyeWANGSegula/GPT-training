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
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
// vehicle services
import { vehicleService } from '../../../_services/vehicle.service';

// ----------------------------------------------------------------------

VehicleNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentVehicle: PropTypes.object,
};

export default function VehicleNewEditForm({ isEdit = false, currentVehicle }) {
  //console.log("current " + currentVehicle);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  
  const NewVehicleSchema = Yup.object().shape({
    lib: Yup.string().required('Vehicle model is required'),
    program: Yup.string().required('Vehicule program is required'),
    stage: Yup.string().required('Vehicle stage is required'),
    silhouette: Yup.string().required('Vehicle silhouette is required'),
    engine: Yup.string().required('Vehicle engine is required'),
    finishing: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      lib: currentVehicle?.lib || '',
      program: currentVehicle?.program || '',
      stage: currentVehicle?.stage || '',
      silhouette: currentVehicle?.silhouette || '',
      engine: currentVehicle?.engine || '',
      finishing: currentVehicle?.finishing || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVehicle]
  );

  const methods = useForm({
    resolver: yupResolver(NewVehicleSchema),
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
    if (isEdit && currentVehicle) {
      
      reset(defaultValues);
    }
    if (!isEdit) {
      
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVehicle]);

  const onSubmit = async (data) => {
    console.log("car data: " + data);
    try {
      if (isEdit && currentVehicle) {
        //updata method needs vehicle id
        data.id = currentVehicle.id;
        vehicleService.updateVehicle(data)
          .then(res => {
            navigate(PATH_DASHBOARD.vehicle.list)
            enqueueSnackbar('Vehicle updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        console.log("car data: " + data);
        vehicleService.addVehicle(data)        
          .then(res => {
            navigate(PATH_DASHBOARD.vehicle.list)
            enqueueSnackbar('Vehicle added successfully');
          })
          .catch(err => console.log(err))

      }
      console.log('DAcarTA', data);
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
              <RHFTextField name="program" label="Program" />
              <RHFTextField name="stage" label="Stage" />
              <RHFTextField name="silhouette" label="Silhouette" />
              <RHFTextField name="engine" label="Engine" />
              <RHFTextField name="finishing" label="Finishing" />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
