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
import VehicleNewEditForm from '../../../sections/dashboard/vehicle/VehicleNewEditForm';
// vehicle services
import { vehicleService } from '../../../_services/vehicle.service';
// ----------------------------------------------------------------------

export default function VehicleEditPage() {
  const { themeStretch } = useSettingsContext();

   const [currentVehicle, setCurrentVehicle] = useState(null);
   

  
  const { name } = useParams();
  console.log('param id: ' + name)
  
  useEffect(() => {     

    vehicleService.getVehicle(name)
        .then(res => {
            setCurrentVehicle(res.data)
            console.log('get vehicle res: ' + res)
            console.log('get vehicle res.lib:' + res.data.lib)
        })
        .catch(err => console.log(err))

}, [])

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit vehicle"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vehicle',
              href: PATH_DASHBOARD.vehicle.list,
            },
            { name: currentVehicle?.vehiclename },
          ]}
        />

        <VehicleNewEditForm isEdit currentVehicle={currentVehicle} />
      </Container>
    </>
  );
}
