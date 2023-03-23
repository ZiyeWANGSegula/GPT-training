import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, AppBar, Box, Button, Tab, Tabs, Divider, TextField, Table, TableBody, TableCell, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { GetApp } from '@mui/icons-material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
// prop types
import PropTypes from 'prop-types';
import Label from '../../../components/label'
import { RHFTextField } from '../../../components/hook-form';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{
                width: '100%',
                p: 3,
                overflowY: 'scroll', // Add overflowY property
                height: 'calc(100% - 48px)', // Add height property adjusts the height according to the AppBar height (assuming AppBar height is 48px)
                '::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                },// The ::-webkit-scrollbar and ::-webkit-scrollbar-thumb styles are added for customizing the scrollbar appearance.
            }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function FileIcon({ fileType }) {
    switch (fileType) {
        case 'pdf':
            return <PictureAsPdfOutlinedIcon />;
        case 'doc':
            return <DescriptionOutlinedIcon />;
        // Add more cases for other file types
        default:
            return <InsertDriveFileOutlinedIcon />;
    }
}

FileIcon.propTypes = {
    fileType: PropTypes.string.isRequired,
};


export default function TestStatuFieldsSectionTesting({ title }) {
    const [tabValue, setTabValue] = useState(0);

    // Add this state for the exemption Dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");

    // tate for the new comment dialog
    const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [dialogCommentContent, setDialogCommentContent] = useState("");

    //  import the useFormContext hook from react-hook-form and watch the changes in the estimated and validated date fields:
    const { watch, register } = useFormContext();
    const estimatedDate = watch('estimatedDate');
    const validatedDate = watch('validatedDate');
    // Add a state to manage the visibility of the exempted fields:
    const [showExtraFields, setShowExtraFields] = useState(false);

    // button state
    const [validateState, setValidateState] = useState(false);


    //function for the new comment dialog
    const handleNewCommentDialogClose = () => {
        setOpenNewCommentDialog(false);
    };

    // Add these functions for the Dialog
    const handleClickOpen = (content) => {
        setDialogContent(content);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    // Use the useEffect hook to toggle the visibility of the exemption fields based on the changes in the date fields:
    useEffect(() => {
        if (estimatedDate !== validatedDate && !!validatedDate) {
            setShowExtraFields(true);
        } else {
            setShowExtraFields(false);
        }
    }, [estimatedDate, validatedDate]);

    const TABS = [
        { value: 'document', label: 'Documents', color: 'info', count: 1 },
        { value: 'incident', label: 'Incident', color: 'success', count: 2 },
        { value: 'comment', label: 'Comment', color: 'warning', count: 5 },
        { value: 'exempt', label: 'Exempt', color: 'error', count: 3 },
    ];
    // Mock data for the comment list
    const commentsMockData = [
        {
            id: 1,
            commenter: "John Doe",
            comment: "This is a sample comment. There is important information to consider.",
            date: "2023-04-01",
        },
        {
            id: 2,
            commenter: "Jane Smith",
            comment: "Another example of a comment. Some things need to be taken into account.",
            date: "2023-04-02",
        },
    ];

    // Mock data for the exemption list
    const exemptionsMockData = [
        {
            id: 1,
            exemptedBy: "Jean Dupont",
            exemptedComments: "Ceci est un exemple de commentaire pour un exempt. Il y a des informations importantes à considérer.",
            date: "2023-04-01",
        },
        {
            id: 2,
            exemptedBy: "Marie Durand",
            exemptedComments: "Un autre exemple de commentaire pour un exempt. Il faut prendre en compte certaines choses.",
            date: "2023-04-02",
        },
    ];
    // Mock data for the documents list
    const mockDocuments = [
        {
            id: 1,
            name: 'Document 1',
            fileType: 'pdf',
            size: '1.2',
            date: '2023-03-01',
        },
        {
            id: 2,
            name: 'Document 2',
            fileType: 'doc',
            size: '0.5',
            date: '2023-03-15',
        },
        // Add more mock documents if needed
    ];

    // Mock data for the Incident list
    const incidentData = [
        {
            date: '2023-01-15',
            assignment: 'Task A',
            duration: 5,
            comment: 'Completed',
        },
        {
            date: '2023-02-21',
            assignment: 'Task B',
            duration: 3,
            comment: 'In progress',
        },
    ];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">

                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="tabs section"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 2,
                        bgcolor: 'background.neutral',
                    }}>
                    {/* <Tab label={title} />
                <Tab key = 'document' value = 'document' label='Documents'icon={<Label color='info' sx={{mr:1}}>5</Label>} />
                <Tab key = 'incident' value = 'incident' label='Incidents'icon={<Label color='success' sx={{mr:1}}>5</Label>} />
                <Tab key = 'comment' value = 'comment' label='Comments'icon={<Label color='warning' sx={{mr:1}}>5</Label>} />
                <Tab key = 'exempt' value = 'exempt' label='Exempts'icon={<Label color='error' sx={{mr:1}}>5</Label>} /> */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Tab
                            label={title}
                            onClick={() => setTabValue(0)}
                            icon={<Box
                                component={validateState ? CheckCircleIcon : CancelIcon}
                                sx={{
                                    ml: 1,
                                    color: validateState ? 'success.main' : 'error.main',
                                }}
                            />} />
                    </Box>
                    <Tab label="Documents" icon={<Label color='info' sx={{ mr: 1 }}>2</Label>} />
                    <Tab label="Incident" icon={<Label color='success' sx={{ mr: 1 }}>5</Label>} />
                    <Tab label="Comment" icon={<Label color='warning' sx={{ mr: 1 }}>4</Label>} />
                    <Tab label="Exempt" icon={<Label color='error' sx={{ mr: 1 }}>3</Label>} />
                </Tabs>
            </AppBar>

            <Divider></Divider>


            <TabPanel value={tabValue} index={0}>
                <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                    }}>
                    <TextField label="Estimated Date" type="date" InputLabelProps={{ shrink: true }} {...register("estimatedDate")} />
                    <TextField label="Real Date" type="date" InputLabelProps={{ shrink: true }} {...register("validatedDate")} />
                    <TextField label="Validated by" fullWidth />
                    {showExtraFields && (
                        <React.Fragment>
                            <RHFTextField name="exemptedComment" label="Exempted Comment" />
                            <RHFTextField name="exemptedBy" label="Exempted By" />
                        </React.Fragment>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 2,
                            gap: 5

                        }}
                    >
                        <Button
                            variant="contained"
                            color='inherit'
                            onClick={() => alert('Draft saved successfully')}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color={validateState ? 'secondary' : 'primary'}
                            onClick={() => setValidateState(!validateState)}
                        >
                            {validateState ? 'Cancel' : 'Validate'}
                        </Button>
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Doc Name</TableCell>
                                <TableCell>Doc Size (MB)</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Replace with your actual data */}
                            {mockDocuments.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <FileIcon fileType={doc.fileType} />
                                            {doc.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => console.log('Download', doc)}>
                                            <GetApp />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>


            <TabPanel value={tabValue} index={2}>
                <Box>
                    {/* Render your list of incidents here */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {incidentData.map((incident, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatDate(incident.date)}</TableCell>
                                        <TableCell>{incident.assignment}</TableCell>
                                        <TableCell>{incident.duration}</TableCell>
                                        <TableCell>{incident.comment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </TabPanel>



            <TabPanel value={tabValue} index={3}>
                <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => setOpenNewCommentDialog(true)}>
                        Add New Comment
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Commenter</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {commentsMockData.map((comment) => (
                                <TableRow key={comment.id}>
                                    <TableCell>{comment.commenter}</TableCell>
                                    <TableCell>
                                        {comment.comment.substring(0, 50)}...
                                        <IconButton onClick={() => handleClickOpen(comment.comment)}>
                                            <InfoIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{comment.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogContent}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exempted By</TableCell>
                                <TableCell>Exempted Comments</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exemptionsMockData.map((exemption) => (
                                <TableRow key={exemption.id}>
                                    <TableCell>{exemption.exemptedBy}</TableCell>
                                    <TableCell>
                                        {exemption.exemptedComments.substring(0, 50)}...
                                        <IconButton onClick={() => handleClickOpen(exemption.exemptedComments)}>
                                            <InfoIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{exemption.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>





                <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Exempted Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialogContent}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </TabPanel>

            <Dialog open={openNewCommentDialog} onClose={handleNewCommentDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Add New Comment</DialogTitle>
                <DialogContent>
                    {/* Add your form or inputs for adding a new comment here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNewCommentDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleNewCommentDialogClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}