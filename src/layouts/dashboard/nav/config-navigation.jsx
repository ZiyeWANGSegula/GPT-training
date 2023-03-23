// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  test: icon('ic_test'),
  user: icon('ic_user'),
  vehicle: icon('ic_vehicle'),
  report: icon('ic_blank'),
  reference: icon('ic_file'),
  resource: icon('ic_facility'),
  dashboard: icon('ic_dashboard'),
  
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // Test
      {
        title: 'tests',
        path: PATH_DASHBOARD.test.list,
        icon: ICONS.test,
        children: [

          { title: 'list', path: PATH_DASHBOARD.test.list },
        ],
      }
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // REFERENCE
      {
        title: 'procedures',
        path: PATH_DASHBOARD.reference.root,
        icon: ICONS.reference,
        children: [
          { title: 'list', path: PATH_DASHBOARD.reference.list },
          { title: 'create', path: PATH_DASHBOARD.reference.new },
        ],
      },
      //Vehicle
      {
        title: 'vehicles',
        path: PATH_DASHBOARD.vehicle.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'list', path: PATH_DASHBOARD.vehicle.list },
          { title: 'create', path: PATH_DASHBOARD.vehicle.new },
        ],
      },
      // Resource
      {
        title: 'facilities',
        path: PATH_DASHBOARD.resource.root,
        icon: ICONS.resource,
        children: [
          { title: 'list', path: PATH_DASHBOARD.resource.list },
          { title: 'create', path: PATH_DASHBOARD.resource.new },
        ],
      },
      //Report
      {
        title: 'report templates',
        path: PATH_DASHBOARD.report.root,
        icon: ICONS.report,
        children: [
          { title: 'list', path: PATH_DASHBOARD.report.list },
          { title: 'create', path: PATH_DASHBOARD.report.new },
        ],
      },
    ],
  },
    // Settings
  // ----------------------------------------------------------------------
  {
    subheader: 'settings',
    items: [
      {
        title: 'users',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
        ],
      },
    ],
  },
];

export default navConfig;
