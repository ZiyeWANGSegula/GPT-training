import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import ReferenceNewEditForm from '../../../sections/dashboard/reference/ReferenceNewEditForm';

// ----------------------------------------------------------------------

export default function ReferenceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Procedure"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Procedure',
              href: PATH_DASHBOARD.reference.list,
            },
            { name: 'New Procedure' },
          ]}
        />
        <ReferenceNewEditForm />
      </Container>
    </>
  );
}
