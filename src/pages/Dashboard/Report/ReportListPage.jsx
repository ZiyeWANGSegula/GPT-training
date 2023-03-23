import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { reportService } from "../../../_services/report.service";


// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections
import { ReportTableToolbar, ReportTableRow } from '../../../sections/dashboard/report/list';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all'];

const TABLE_HEAD = [
  { id: 'id', label: 'Id', align: 'left' },
  { id: 'lib', label: 'Template title', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
  { id: 'updatedAt', label: 'Updated At', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ReportListPage() {
  const [tableData, setTableData] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    reportService.getAllReports().then(
        res => {
            console.log(res);
            setTableData(res.data);
        }
    ).catch(err => {
        console.log(err);
    })

}, [])

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();



  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterSearch, setFilterSearch] = useState('');

  const [filterStatus, setFilterStatus] = useState('all');

  const [filterFirstDate, setFilterFirstDate] = useState("");

  const [filterLastDate, setFilterLastDate] = useState("");

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterSearch,
    filterFirstDate,
    filterLastDate,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterSearch !== '' || filterFirstDate !== "" || filterLastDate !== "" || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterSearch) ||
    (!dataFiltered.length && !!filterFirstDate) ||
    (!dataFiltered.length && !!filterLastDate) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterSearch = (event) => {
    setPage(0);
    setFilterSearch(event.target.value);
  };

  const handleFilterFirstDate = (event) => {
    setPage(0);
    setFilterFirstDate(event.target.value);
  };

  const handleFilterLastDate = (event) => {
    setPage(0);
    setFilterLastDate(event.target.value);
  };

  const handleDeleteRow = (id) => {
    reportService.deleteReport(id)
        .then(res => {
            // Mise à jour du state pour affichage
            setTableData((current) => current.filter(report => report.id !== id))
            setSelected([]);
        })
        .catch(err => console.log(err))
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };


  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.report.edit(paramCase(id.toString())));
  };

  const handleDownloadReport = (docUrl, docOriginalname) => {
    reportService.downloadReport(docUrl, docOriginalname)
  }


  const handleResetFilter = () => {
    setFilterSearch('');
    setFilterStatus('all');
    setFilterFirstDate("");
    setFilterLastDate("");
  };

  return (
    <>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Report templates List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.report.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Report template
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <ReportTableToolbar
            isFiltered={isFiltered}
            filterSearch={filterSearch}
            filterFirstDate={filterFirstDate}
            filterLastDate={filterLastDate}
            onfilterSearch={handleFilterSearch}
            onFilterFirstDate={handleFilterFirstDate}
            onFilterLastDate={handleFilterLastDate}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ReportTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => {handleEditRow(row.id); console.log("row: " + row.id)}}
                        onDownloadReport={() => handleDownloadReport(row.docUrl, row.docOriginalname)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterSearch, filterFirstDate,
  filterLastDate}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterSearch) {
    inputData = inputData.filter(
      (report) => 
      report.id.toString().indexOf(filterSearch) !== -1 ||
      report.lib.toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1 ||
      fDate(report.createdAt).toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1 ||
      fDate(report.updatedAt).toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1
    );
  }

  if(filterFirstDate) {
    inputData = inputData.filter(
      (report) => new Date(report.createdAt) >= new Date(filterFirstDate)
    );
  }

  if(filterLastDate) {
    inputData = inputData.filter(
      (report) => new Date(report.createdAt) <= new Date((new Date(filterLastDate)).valueOf() + 1000*3600*24)
    );
  }

  return inputData;
}
