import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import ReportNewEditForm from '../../../sections/dashboard/report/ReportNewEditForm';

// ----------------------------------------------------------------------

export default function ReportCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Report template"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Report template',
              href: PATH_DASHBOARD.report.list,
            },
            { name: 'New Report template' },
          ]}
        />
        <ReportNewEditForm />
      </Container>
    </>
  );
}
