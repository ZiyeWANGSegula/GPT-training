import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import ResourceNewEditForm from '../../../sections/dashboard/resource/ResourceNewEditForm';

// ----------------------------------------------------------------------

export default function ResourceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new facility"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Facilities',
              href: PATH_DASHBOARD.resource.list,
            },
            { name: 'New facility' },
          ]}
        />
        <ResourceNewEditForm />
      </Container>
    </>
  );
}
