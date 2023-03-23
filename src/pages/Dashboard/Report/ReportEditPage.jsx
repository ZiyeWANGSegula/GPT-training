import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import ReportNewEditForm from '../../../sections/dashboard/report/ReportNewEditForm';
// report services
import { reportService } from '../../../_services/report.service';
// ----------------------------------------------------------------------

export default function ReportEditPage() {
  const { themeStretch } = useSettingsContext();

   const [currentReport, setCurrentReport] = useState(null);
   

  
  const { name } = useParams();
  console.log('param id: ' + name)
  
  useEffect(() => {     

    reportService.getReport(name)
        .then(res => {
            setCurrentReport(res.data)
            console.log('get report res: ' + res)
            console.log('get report res.lib:' + res.data.lib)
        })
        .catch(err => console.log(err))

}, [])

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Report template"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Report template',
              href: PATH_DASHBOARD.report.list,
            },
            { name: currentReport?.reportname },
          ]}
        />

        <ReportNewEditForm isEdit currentReport={currentReport} />
      </Container>
    </>
  );
}
