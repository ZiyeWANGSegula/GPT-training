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
import ReferenceNewEditForm from '../../../sections/dashboard/reference/ReferenceNewEditForm';
// reference services
import { referenceService } from '../../../_services/reference.service';
// ----------------------------------------------------------------------

export default function ReferenceEditPage() {
  const { themeStretch } = useSettingsContext();

   const [currentReference, setCurrentReference] = useState(null);
   

  
  const { name } = useParams();
  console.log('param id: ' + name)
  
  useEffect(() => {     

    referenceService.getReference(name)
        .then(res => {
            setCurrentReference(res.data)
            console.log('get reference res: ' + res)
            console.log('get reference res.data:' + res.data.lib)
        })
        .catch(err => console.log(err))

}, [])

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Procedure"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Procedure',
              href: PATH_DASHBOARD.reference.list,
            },
            { name: currentReference?.lib },
          ]}
        />

        <ReferenceNewEditForm isEdit currentReference={currentReference} />
      </Container>
    </>
  );
}
