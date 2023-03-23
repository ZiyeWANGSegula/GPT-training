// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
//authentication
import { useAuthContext } from "../../auth/useAuthContext"
// components
import { useSettingsContext } from '../../components/settings';
//general APP
import {AppWelcome, AppWidgetSummary} from '../../sections/general/app';

// assets
import { SeoIllustration } from '../../assets/illustrations';


// ----------------------------------------------------------------------


export default function GeneralAppPage() {

    const { user } = useAuthContext()
    console.log('user should be in the auth context', user)

    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    
    return(
    <Container maxWidth={themeStretch ? false : 'xl'}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <AppWelcome
          title={`Welcome back! \n ${user?.fullName}`}
          description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
          img={
            <SeoIllustration
              sx={{
                p: 3,
                width: 360,
                margin: { xs: 'auto', md: 'inherit' },
              }}
            />
          }
          action={<Button variant="contained">Go Now</Button>}
        />
      </Grid>

      <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total vehicle"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total test reports"
              percent={0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
    </Grid>
    </Container>
)}