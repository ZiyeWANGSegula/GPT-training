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
// user services
import { userService } from '../../../_services/user.service';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  console.log("current " + currentUser);
  const categories = ["ADMIN", "CUSTOMER", "MANAGER", "USER"]
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();



  const NewUserSchema = ({isEdit}) => {
    if(isEdit){
      return Yup.object().shape({    
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Email must be a valid email address'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      cat: Yup.string().required('Category is required'),
    })}else{
      return Yup.object().shape({    
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Email must be a valid email address'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        cat: Yup.string().required('Category is required'),
        password: Yup.string().required('Password is required'),
        passwordRepeat: Yup.string().required('Repeated password should match password above'),
      })
    }
}

  const defaultValues = useMemo(
    () => ({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      cat: currentUser?.cat || '',
      password: currentUser?.password || '',
      passwordRepeat: currentUser?.passwordRepeat || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit && currentUser) {

      reset(defaultValues);
    }
    if (!isEdit) {

      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      if (isEdit && currentUser) {
        //updata method needs user id
        data.id = currentUser.id;
        userService.updateUser(data)
          .then(res => {
            navigate(PATH_DASHBOARD.user.list)
            enqueueSnackbar('User updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        userService.addUser(data)
          .then(res => {
            navigate(PATH_DASHBOARD.user.list)
            enqueueSnackbar('User added successfully');
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
              <RHFTextField name="username" label="Username" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="firstName" label="First name" />

              <RHFSelect native name="cat" label="Category" placeholder="Categories">
                <option value="" />
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="lastName" label="Last name" />
              {!isEdit && (<RHFTextField name="password" label="Password" />)}
              {!isEdit && (<RHFTextField name="passwordRepeat" label="Repeat password" />)}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
