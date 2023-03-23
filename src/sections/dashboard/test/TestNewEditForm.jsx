import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect, useMemo } from 'react';
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
// test services
import { testService } from '../../../_services/test.service';
import { userService } from '../../../_services/user.service';
import { resourceService } from '../../../_services/resource.service';
import { reportService } from '../../../_services/report.service';
import { vehicleService } from '../../../_services/vehicle.service';
import { referenceService } from '../../../_services/reference.service';

// ----------------------------------------------------------------------

TestNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTest: PropTypes.object,
};

export default function TestNewEditForm({ isEdit = false, currentTest }) {

  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [references, setReferences] = useState([]);

  let today = new Date().toISOString().slice(0, 10)
  console.log('date now')
  console.log(today)

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const user = [
    {
      date: '2023-01-15',
      assignment: 'Task A',
      duration: 5,
      comment: 'Completed',
    },
    {
      date: '2023-02-21',
      assignment: 'Task B',
      duration: 3,
      comment: 'In progress',
    },
  ];

  const NewTestSchema = Yup.object().shape({
    estimStartAt:Yup.string().required('Label is required'),
    lib: Yup.string().required('Label is required'),
    reportId: Yup.number().required('Category is required'),
    resourceId: Yup.number().required('Place is required'),
    referentCustomerId:Yup.number().required('Label is required'),
    referentId:Yup.number().required('Label is required'),
    vehicleId:Yup.number().required('Label is required'),
  });

  const defaultValues = useMemo(
    () => ({
      estimStartAt: currentTest?.estimStartAt || today,
      lib: currentTest?.lib || '',
      reportId: currentTest?.reportId || '',
      resourceId: currentTest?.resourceId || '',
      referentCustomerId: currentTest?.referentCustomerId || '',
      referentId: currentTest?.referentId || '',
      vehicleId: currentTest?.vehicleId || '',
    }),
    [currentTest]
  );

  const methods = useForm({
    resolver: yupResolver(NewTestSchema),
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
    referenceService.getAllReferences().then((res) => {setReferences(res.data);}).catch(err => {console.log(err);});
    reportService.getAllReports().then((res) => { setReports(res.data); console.log('reports', res.data) }).catch(err => { console.log(err) })
    resourceService.getAllResources().then((res) => { setResources(res.data) }).catch(err => { console.log(err) });
    vehicleService.getAllVehicles().then((res) => { setVehicles(res.data);}).catch(err => { console.log(err)})
    if (isEdit && currentTest) {
      
      reset(defaultValues);
    }
    if (!isEdit) {
      
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTest]);

  const onSubmit = async (data) => {
    try {
      if (isEdit && currentTest) {
        //updata method needs test id
        data.id = currentTest.id;
        testService.updateTest(data)
          .then(res => {
            navigate(PATH_DASHBOARD.test.list)
            enqueueSnackbar('Test updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        testService.addTest(data)
          .then(res => {
            navigate(PATH_DASHBOARD.test.list)
            enqueueSnackbar('Test added successfully');
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
              <RHFTextField name="estimStartAt" label="Test Start At" type='date'/>
              <RHFTextField name="lib" label="Label" />
              <RHFSelect native name="referentId" label="Referent" placeholder="Referent user">
                <option value="" />
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
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
              <RHFSelect native name="referenceId" label="Procedure" placeholder="">
                <option value="" />
                {references.map((reference) => (
                  <option key={reference.id} value={reference.id}>
                    {reference.lib}
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
              <RHFSelect native name="vehicleId" label="Vehicle" placeholder="">
                <option value="car" />
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.lib}
                  </option>
                ))}
              </RHFSelect>
              
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Test' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
