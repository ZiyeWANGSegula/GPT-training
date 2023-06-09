import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import VehicleNewEditForm from '../../../sections/dashboard/vehicle/VehicleNewEditForm';

// ----------------------------------------------------------------------

export default function VehicleCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new vehicle"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vehicle',
              href: PATH_DASHBOARD.vehicle.list,
            },
            { name: 'New vehicle' },
          ]}
        />
        <VehicleNewEditForm />
      </Container>
    </>
  );
}
