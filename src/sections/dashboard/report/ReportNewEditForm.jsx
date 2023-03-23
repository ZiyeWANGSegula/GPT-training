import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
// report services
import { reportService } from '../../../_services/report.service';
// file upload
import {FileNewFolderDialog} from '../file';

import Axios from '../../../_services/caller.service';

// ----------------------------------------------------------------------

ReportNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentReport: PropTypes.object,
};

export default function ReportNewEditForm({ isEdit = false, currentReport }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [uploaderResponse, setUploaderResponse] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
    console.log('openUploadFile'+openUploadFile);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  }


  
  const NewReportSchema = Yup.object().shape({
    lib: Yup.string().required('Report model is required'),
  });

  const defaultValues = useMemo(
    () => ({
      lib: currentReport?.lib || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentReport]
  );

  const methods = useForm({
    resolver: yupResolver(NewReportSchema),
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
    if (isEdit && currentReport) {
      
      reset(defaultValues);
    }
    if (!isEdit) {
      
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentReport]);

  const onSubmit = async (data) => {
    console.log("car data: " + data);
    try {
      if (isEdit && currentReport) {
        //updata method needs report id
        data.id = currentReport.id;
        var newData = {...data, ...uploaderResponse}
        reportService.updateReport(newData)
          .then(res => {
            navigate(PATH_DASHBOARD.report.list)
            enqueueSnackbar('Report updated successfully');
          })
          .catch(err => console.log(err))
      }
      if (!isEdit) {
        console.log("car data: " + data);
        var newData = {...data, ...uploaderResponse}
        reportService.addReport(newData)        
          .then(res => {
            navigate(PATH_DASHBOARD.report.list)
            enqueueSnackbar('Report added successfully');
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
              <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleOpenUploadFile}
            >
              Upload
            </Button>             

            </Box>
            <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} entity='report' setUploaderInfo= {setUploaderResponse}/>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Report template' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      
    </FormProvider>
  );
}
