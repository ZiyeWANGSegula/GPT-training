import { Grid, Card, Button, Typography, Stack, Box, Divider } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { useForm, Controller } from 'react-hook-form';
import useResponsive from '../../../hooks/useResponsive';
import TestWorkflowRequirementsBlock from './TestWorkflowRequirementsBlock';
import TestStatuFieldsSectionReport from './TestStatuFieldsSectionReport';
export default function TestWorkflowReports({ onNextStep, onBackStep }) {
    const methods = useForm();

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
    return (
        <>
            <FormProvider methods={methods} sx={{ p: 3, width: '100%' }}>
                <Card sx={{ width: '100%' }}>
                    <Stack
                        spacing={{ xs: 2, md: 2 }}
                        sx={{ p: 3 }}
                    >
                        <TestStatuFieldsSectionReport title={"Flash report"}></TestStatuFieldsSectionReport>
                        <TestStatuFieldsSectionReport title={"Complete report"}></TestStatuFieldsSectionReport>
                    </Stack>


                    <Divider sx={{ my: 3, borderStyle: 'dashed', marginLeft: 6, marginRight: 6 }} />

                    <Stack
                        spacing={2}
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                        sx={{ width: 1, padding: 3 }}
                    >
                        <Button
                            size="medium"
                            color="inherit"
                            onClick={onBackStep}
                            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                        >
                            Back
                        </Button>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={onNextStep}
                            sx={{ margin: 3 }}
                        >
                            Validate report
                        </Button>
                    </Stack>

                </Card>





            </FormProvider>
        </>

    )

}