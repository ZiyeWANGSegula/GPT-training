import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
// axios services
import { referenceService } from '../../../_services/reference.service';
import { userService } from '../../../_services/user.service';
import { reportService } from '../../../_services/report.service';
import { resourceService } from '../../../_services/resource.service';
import { FileNewFolderDialog } from '../file';

// ----------------------------------------------------------------------

ReferenceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentReference: PropTypes.object,
};

export default function ReferenceNewEditForm({ isEdit = false, currentReference }) {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);


  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewReferenceSchema = Yup.object().shape({
    lib: Yup.string().required('Name is required.'),
    ref: Yup.string().required('Reference is required.'),
    duration: Yup.number().required('Duration is required'),
    durationCustomer: Yup.number().required('Costomer Duration is required'),
    referentId: Yup.number().required('Referent ID is required'),
    resourceId: Yup.number().required('Facility ID is required'),
    referentCustomerId: Yup.number().required('Customer ID is required'),
    reportId: Yup.number().required('Report template ID is required'),
    perimeter:Yup.string().required('Perimeter is required.'),
  });

  const defaultValues = useMemo(
    () => ({
      lib: currentReference?.lib || '',
      ref: currentReference?.ref || '',
      duration: currentReference?.duration || '',
      durationCustomer: currentReference?.durationCustomer || '',
      referentId: currentReference?.referentId || '',
      resourceId: currentReference?.resourceId || '',
      referentCustomerId: currentReference?.referentCustomerId || '',
      reportId: currentReference?.reportId || '',
      perimeter: currentReference?.perimeter || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentReference]
  );

  const methods = useForm({
    resolver: yupResolver(NewReferenceSchema),
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
    userService.getAllUsers().then((res) => {
      setUsers(res.data);
      console.log('users', res.data);
    }).catch(err => {
      console.log(err);
    })

    reportService.getAllReports().then((res) => { setReports(res.data); console.log('reports', res.data) }).catch(err => { console.log(err) })
    resourceService.getAllResources().then((res) => { setResources(res.data) }).catch(err => { console.log(err) });
    
    if (isEdit && currentReference) {
      reset(defaultValues);
    }
    if (!isEdit) {
      // getUsers()
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentReference]);

  const onSubmit = async (data) => {
    try {
      if (isEdit && currentReference) {
        //updata method needs user id
        data.id = currentReference.id;
        referenceService.updateReference(data)
          .then(res => {
            navigate(PATH_DASHBOARD.reference.list)
            enqueueSnackbar('Reference updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        referenceService.addReference(data)
          .then(res => {
            navigate(PATH_DASHBOARD.reference.list)
            enqueueSnackbar('Reference added successfully');
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
              <RHFTextField name="lib" label="Name" />
              <RHFTextField name="ref" label="Reference" />
              <RHFTextField name="duration" label="Duration" />
              <RHFTextField name="durationCustomer" label="Costomer Duration" />
              <RHFSelect native name="referentId" label="Referent" placeholder="Referent user">
                <option value="" />
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.id}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="referentCustomerId" label="Customer" placeholder="">
                <option value="" />
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="resourceId" label="Facility" placeholder="">
                <option value="" />
                {resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.lib}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="reportId" label="Report template" placeholder="">
                <option value="" />
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.lib}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="perimeter" label="Perimeter" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Procedure' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

      </Grid>
    </FormProvider>
  );
}
