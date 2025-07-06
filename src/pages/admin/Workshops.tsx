import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
  Divider
} from "@mui/material";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  X,
  ChevronDown
} from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Workshops: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<any>(null);
  const [timeSlots, setTimeSlots] = useState<Array<{ startTime: string, endTime: string }>>([{ startTime: '', endTime: '' }]);

  const workshops = [
    {
      id: 1,
      title: "Woodworking Basics",
      description: "Learn fundamental woodworking techniques",
      date: "2023-06-15",
      maxCapacity: 12,
      timeSlots: [
        { id: 1, startTime: "10:00 AM", endTime: "12:00 PM", availableSpots: 8 },
        { id: 2, startTime: "02:00 PM", endTime: "04:00 PM", availableSpots: 12 }
      ],
      isDeleted: false
    },
    {
      id: 2,
      title: "Advanced Pottery",
      description: "Master advanced pottery techniques",
      date: "2023-06-20",
      maxCapacity: 8,
      timeSlots: [
        { id: 3, startTime: "09:00 AM", endTime: "11:00 AM", availableSpots: 3 }
      ],
      isDeleted: false
    },
  ];

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleOpenEditDialog = (workshop: any) => {
    setCurrentWorkshop(workshop);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots.splice(index, 1);
    setTimeSlots(newTimeSlots);
  };

  const handleTimeSlotChange = (index: number, field: string, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setTimeSlots(newTimeSlots);
  };

  const getStatusChip = (workshop: any) => {
    const totalSlots = workshop.timeSlots.reduce((sum: number, slot: any) => sum + slot.availableSpots, 0);
    const percentageFilled = ((workshop.maxCapacity - totalSlots) / workshop.maxCapacity) * 100;

    if (percentageFilled >= 80) {
      return (
        <Chip
          icon={<AlertCircle size={16} />}
          label="Almost Full"
          color="warning"
          size="small"
        />
      );
    } else if (percentageFilled === 100) {
      return (
        <Chip
          icon={<XCircle size={16} />}
          label="Sold Out"
          color="error"
          size="small"
        />
      );
    } else {
      return (
        <Chip
          icon={<CheckCircle size={16} />}
          label="Available"
          color="success"
          size="small"
        />
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Workshop Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={handleOpenAddDialog}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Create New Workshop
          </Button>
        </Box>

        {/* Workshops Table */}
        <Paper elevation={0} sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Workshop</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}><Calendar size={18} style={{ marginRight: 8 }} /> Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}><Users size={18} style={{ marginRight: 8 }} /> Capacity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}><Clock size={18} style={{ marginRight: 8 }} /> Time Slots</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}><DollarSign size={18} style={{ marginRight: 8 }} /> Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workshops.map((workshop) => (
                  <TableRow
                    key={workshop.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography fontWeight={500}>{workshop.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workshop.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(workshop.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {workshop.maxCapacity - workshop.timeSlots.reduce((sum: number, slot: any) => sum + slot.availableSpots, 0)} / {workshop.maxCapacity}
                    </TableCell>
                    <TableCell>
                      {workshop.timeSlots.map(slot => (
                        <div key={slot.id} style={{ marginBottom: 4 }}>
                          <Chip
                            label={`${slot.startTime} - ${slot.endTime}`}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <span style={{ fontSize: 12, color: '#666' }}>
                            ({slot.availableSpots} spots left)
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {getStatusChip(workshop)}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Workshop">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEditDialog(workshop)}
                          sx={{ mr: 1 }}
                        >
                          <Edit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Workshop">
                        <IconButton color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add Workshop Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Create New Workshop</Typography>
            <IconButton onClick={handleCloseAddDialog}>
              <X size={20} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Workshop Title"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
              />
              <DatePicker
                label="Workshop Date"
                slotProps={{ textField: { fullWidth: true } }}
              />
              <TextField
                fullWidth
                label="Maximum Capacity"
                type="number"
                variant="outlined"
              />

              <Divider>Time Slots</Divider>

              {timeSlots.map((slot, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="center">
                  <TextField
                    select
                    label="Start Time"
                    value={slot.startTime}
                    onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                    sx={{ flex: 1 }}
                    InputProps={{
                      endAdornment: <ChevronDown size={18} />,
                    }}
                  >
                    {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(time => (
                        <MenuItem key={time} value={time}>{time}</MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    label="End Time"
                    value={slot.endTime}
                    onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                    sx={{ flex: 1 }}
                    InputProps={{
                      endAdornment: <ChevronDown size={18} />,
                    }}
                  >
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                        <MenuItem key={time} value={time}>{time}</MenuItem>
                      ))}
                  </TextField>
                  {timeSlots.length > 1 && (
                    <IconButton onClick={() => handleRemoveTimeSlot(index)} color="error">
                      <Trash2 size={18} />
                    </IconButton>
                  )}
                </Stack>
              ))}

              <Button
                startIcon={<Plus size={18} />}
                onClick={handleAddTimeSlot}
                variant="outlined"
              >
                Add Time Slot
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseAddDialog} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Create Workshop
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Workshop Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Edit Workshop</Typography>
            <IconButton onClick={handleCloseEditDialog}>
              <X size={20} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {currentWorkshop && (
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Workshop Title"
                  variant="outlined"
                  defaultValue={currentWorkshop.title}
                />
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  defaultValue={currentWorkshop.description}
                />
                <DatePicker
                  label="Workshop Date"
                  defaultValue={new Date(currentWorkshop.date)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TextField
                  fullWidth
                  label="Maximum Capacity"
                  type="number"
                  variant="outlined"
                  defaultValue={currentWorkshop.maxCapacity}
                />

                <Divider>Time Slots</Divider>

                {currentWorkshop.timeSlots.map((slot: any, _index: number) => (
                  <Stack key={slot.id} direction="row" spacing={2} alignItems="center">
                    <TextField
                      select
                      label="Start Time"
                      defaultValue={slot.startTime}
                      sx={{ flex: 1 }}
                      InputProps={{
                        endAdornment: <ChevronDown size={18} />,
                      }}
                    >
                      {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(time => (
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                      select
                      label="End Time"
                      defaultValue={slot.endTime}
                      sx={{ flex: 1 }}
                      InputProps={{
                        endAdornment: <ChevronDown size={18} />,
                      }}
                    >
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                    </TextField>
                    {currentWorkshop.timeSlots.length > 1 && (
                      <IconButton color="error">
                        <Trash2 size={18} />
                      </IconButton>
                    )}
                  </Stack>
                ))}

                <Button
                  startIcon={<Plus size={18} />}
                  variant="outlined"
                >
                  Add Time Slot
                </Button>
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseEditDialog} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Workshops;