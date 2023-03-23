import { Grid, Card, Button, Typography, Stack, Box, Divider } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';
import FormProvider, { RHFTextField } from '../../../components/hook-form'
import { useForm, Controller } from 'react-hook-form';
import useResponsive from '../../../hooks/useResponsive';
import TestWorkflowRequirementsBlock from './TestWorkflowRequirementsBlock';
import TestStatuFieldsSection from './TestStatuFieldsSection';
export default function TestWorkflowFeasibility({ onNextStep, onBackStep }) {
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
                        <TestStatuFieldsSection title={"Facility available"}></TestStatuFieldsSection>
                        <TestStatuFieldsSection title={"Skill available"}></TestStatuFieldsSection>
                        <TestStatuFieldsSection title={"Facility backup"}></TestStatuFieldsSection>
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
                            Validate Feasibility
                        </Button>
                    </Stack>

                </Card>





            </FormProvider>
        </>

    )

}