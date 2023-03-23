import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import TestNewEditForm from '../../../sections/dashboard/Test/TestNewEditForm';

// ----------------------------------------------------------------------

export default function TestCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Test"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Test',
              href: PATH_DASHBOARD.test.list,
            },
            { name: 'New Test' },
          ]}
        />
        <TestNewEditForm />
      </Container>
    </>
  );
}
