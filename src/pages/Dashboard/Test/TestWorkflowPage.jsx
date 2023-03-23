import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Container, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//redux
import { useDispatch, useSelector } from '../../../redux/store';
import { backStep, nextStep, gotoStep, resetWorkflow } from '../../../redux/slices/test';

import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import { CheckoutSteps, TestWorkflowDelivery, TestWorkflowRequirements, TestWorkflowTesting, TestWorkflowReports, TestWorkflowFeasibility, TestWorkflowPlanningFreeze } from '../../../sections/dashboard/test';
import { testService } from '../../../_services/test.service';

// ----------------------------------------------------------------------

const STEPS = ['Requirements', 'Feasibility', 'Planning Freeze', 'Delivery', 'Testing', 'Reports'];

// ----------------------------------------------------------------------

export default function TestWorkflowPage() {
    const { themeStretch } = useSettingsContext();

    const [currentTest, setCurrentTest] = useState(null);



    const { name } = useParams();
    console.log('param id: ' + name)
    const navigate = useNavigate();
    const { settings } = useSettingsContext();

    useEffect(() => {
        console.log('use effect called');
        testService.getTest(name)
            .then(res => {
                setCurrentTest(res.data)
                console.log('get Test res: ' + res)
                console.log(`get Test res.lib:${res.data.lib}`)
            })
            .catch(err => console.log(err))

    }, [])
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.test);
    const { activeStep } = checkout;
    const completed = activeStep === STEPS.length;




    const handleNextStep = () => {
        dispatch(nextStep());
    };

    const handleBackStep = () => {
        dispatch(backStep());
    };

    const handleGotoStep = (step) => {
        dispatch(gotoStep(step));
    };

    const handleResetWorkflow = () => {
        dispatch(resetWorkflow());
    }
    console.log('currentTest', currentTest)
    return (
        <>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Test Workflow"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Tests',
                            href: PATH_DASHBOARD.test.root,
                        },
                        { name: 'Test Workflow' },
                    ]}
                />

                <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
                    <Grid item xs={12} md={8}>
                        <CheckoutSteps activeStep={activeStep} steps={STEPS} />
                    </Grid>
                </Grid>
                {completed ? (
                    <Button onClick={handleResetWorkflow}>finished</Button>
                ) : (currentTest == null ? (<div>loading</div>) : (

                    <>
                        {activeStep === 0 && (
                            <TestWorkflowRequirements
                                currentTest={currentTest}
                                checkout={checkout}
                                onNextStep={handleNextStep}
                            />
                        )}
                        {activeStep === 1 && (
                            <TestWorkflowFeasibility
                                checkout={checkout}
                                onBackStep={handleBackStep}
                                onNextStep={handleNextStep}
                            />
                        )}
                        {activeStep === 2 && (
                            <TestWorkflowPlanningFreeze
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                            />
                        )}
                        {activeStep === 3 && (
                            <TestWorkflowDelivery
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                            />
                        )}
                        {activeStep === 4 && (
                            <TestWorkflowTesting
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                            />
                        )}
                        {activeStep === 5 && (
                            <TestWorkflowReports
                                checkout={checkout}
                                onNextStep={handleNextStep}
                                onBackStep={handleBackStep}
                            />
                        )}
                    </>
                )
                )}
            </Container>
        </>
    )
}