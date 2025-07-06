import React, { useState, useEffect } from "react";
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
  Divider,
  Alert,
  CircularProgress
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
import { toast } from "sonner";
import { useCreateWorkshopMutation, useDeleteWorkshopMutation, useGetWorkshopsQuery, useUpdateWorkshopMutation } from "../../Redux/features/workshops/workshopApiSlice";

interface TimeSlot {
  id?: number;
  startTime: string;
  endTime: string;
  availableSpots?: number;
}

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  maxCapacity: number;
  timeSlots: TimeSlot[];
  isDeleted: boolean;
}

const Workshops: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<Workshop | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '' }]);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [workshopTitle, setWorkshopTitle] = useState('');
  const [workshopDescription, setWorkshopDescription] = useState('');
  const [workshopDate, setWorkshopDate] = useState<Date | null>(null);
  const [maxCapacity, setMaxCapacity] = useState<number>(10);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState<Date | null>(null);
  const [editMaxCapacity, setEditMaxCapacity] = useState<number>(10);
  const [editTimeSlots, setEditTimeSlots] = useState<TimeSlot[]>([]);

  // RTK Query hooks
  const {
    data: workshopsData = [],
    isLoading: isWorkshopsLoading,
    isError: isWorkshopsError,
    error: workshopsError,
    refetch: refetchWorkshops
  } = useGetWorkshopsQuery({}, { refetchOnMountOrArgChange: true });

  const [createWorkshop, {
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
    error: createError,
  }] = useCreateWorkshopMutation();

  const [updateWorkshop, {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    error: updateError,
  }] = useUpdateWorkshopMutation();

  const [deleteWorkshop, {
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    error: deleteError,
  }] = useDeleteWorkshopMutation();

  // Toast notifications
  useEffect(() => {
    if (isCreateSuccess) {
      toast.success("Workshop created successfully!");
      refetchWorkshops();
      handleCloseAddDialog();
    }
    if (isUpdateSuccess) {
      toast.success("Workshop updated successfully!");
      refetchWorkshops();
      handleCloseEditDialog();
    }
    if (isDeleteSuccess) {
      toast.success("Workshop deleted successfully!");
      refetchWorkshops();
    }
  }, [isCreateSuccess, isUpdateSuccess, isDeleteSuccess, refetchWorkshops]);

  useEffect(() => {
    if (createError || updateError || deleteError || isWorkshopsError) {
      const errorData = createError || updateError || deleteError || workshopsError;
      if (errorData && 'data' in errorData) {
        toast.error((errorData as any).data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  }, [createError, updateError, deleteError, isWorkshopsError, workshopsError]);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setWorkshopTitle('');
    setWorkshopDescription('');
    setWorkshopDate(null);
    setMaxCapacity(10);
    setTimeSlots([{ startTime: '', endTime: '' }]);
    setError(null);
  };

  const handleOpenEditDialog = (workshop: Workshop) => {
    setCurrentWorkshop(workshop);
    setEditTitle(workshop.title);
    setEditDescription(workshop.description);
    setEditDate(new Date(workshop.date));
    setEditMaxCapacity(workshop.maxCapacity);
    setEditTimeSlots([...workshop.timeSlots]);
    setOpenEditDialog(true);
    setError(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentWorkshop(null);
    setError(null);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
  };

  const handleAddEditTimeSlot = () => {
    setEditTimeSlots([...editTimeSlots, { startTime: '', endTime: '', availableSpots: editMaxCapacity }]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots.splice(index, 1);
    setTimeSlots(newTimeSlots);
  };

  const handleRemoveEditTimeSlot = (index: number) => {
    const newTimeSlots = [...editTimeSlots];
    newTimeSlots.splice(index, 1);
    setEditTimeSlots(newTimeSlots);
  };

  const handleTimeSlotChange = (index: number, field: string, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setTimeSlots(newTimeSlots);
  };

  const handleEditTimeSlotChange = (index: number, field: string, value: string) => {
    const newTimeSlots = [...editTimeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setEditTimeSlots(newTimeSlots);
  };

  const validateTimeSlots = (slots: TimeSlot[]) => {
    for (const slot of slots) {
      if (!slot.startTime || !slot.endTime) {
        return "All time slots must have both start and end times";
      }

      const startMinutes = convertTimeToMinutes(slot.startTime);
      const endMinutes = convertTimeToMinutes(slot.endTime);

      if (endMinutes <= startMinutes) {
        return "End time must be after start time";
      }
    }
    return null;
  };

  const convertTimeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return (hours % 12 + (period === 'PM' ? 12 : 0)) * 60 + minutes;
  };

  const handleCreateWorkshop = async () => {
    const timeSlotError = validateTimeSlots(timeSlots);
    if (!workshopTitle || !workshopDate || timeSlotError) {
      setError(timeSlotError || "Please fill all required fields");
      return;
    }

    try {
      const newWorkshop = {
        title: workshopTitle,
        description: workshopDescription,
        date: workshopDate.toISOString().split('T')[0],
        maxCapacity: maxCapacity,
        timeSlots: timeSlots.map((slot, index) => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
          availableSpots: maxCapacity
        }))
      };

      await createWorkshop(newWorkshop).unwrap();
    } catch (err) {
      console.error("Failed to create workshop:", err);
    }
  };

  const handleSaveChanges = async () => {
    if (!currentWorkshop) return;

    const timeSlotError = validateTimeSlots(editTimeSlots);
    if (!editTitle || !editDate || timeSlotError) {
      setError(timeSlotError || "Please fill all required fields");
      return;
    }

    try {
      const updatedWorkshop = {
        id: currentWorkshop.id,
        title: editTitle,
        description: editDescription,
        date: editDate.toISOString().split('T')[0],
        maxCapacity: editMaxCapacity,
        timeSlots: editTimeSlots.map(slot => ({
          id: slot.id,
          startTime: slot.startTime,
          endTime: slot.endTime,
          availableSpots: slot.availableSpots || editMaxCapacity
        }))
      };

      await updateWorkshop(updatedWorkshop).unwrap();
    } catch (err) {
      console.error("Failed to update workshop:", err);
    }
  };

  const handleDeleteWorkshop = async (id: number) => {
    try {
      await deleteWorkshop(id).unwrap();
    } catch (err) {
      console.error("Failed to delete workshop:", err);
    }
  };

  const getStatusChip = (workshop: Workshop) => {
    const totalSlots = workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0);
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

  const activeWorkshops = workshopsData.filter((workshop: Workshop) => !workshop.isDeleted);

  if (isWorkshopsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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
            disabled={isCreateLoading}
          >
            {isCreateLoading ? <CircularProgress size={24} /> : "Create New Workshop"}
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
                {activeWorkshops.map((workshop: Workshop) => (
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
                      {workshop.maxCapacity - workshop.timeSlots.reduce((sum, slot) => sum + (slot.availableSpots || 0), 0)} / {workshop.maxCapacity}
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
                          disabled={isUpdateLoading}
                        >
                          <Edit size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Workshop">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteWorkshop(workshop.id)}
                          disabled={isDeleteLoading}
                        >
                          {isDeleteLoading ? <CircularProgress size={18} /> : <Trash2 size={18} />}
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
            <IconButton onClick={handleCloseAddDialog} disabled={isCreateLoading}>
              <X size={20} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                fullWidth
                label="Workshop Title"
                variant="outlined"
                value={workshopTitle}
                onChange={(e) => setWorkshopTitle(e.target.value)}
                required
                disabled={isCreateLoading}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={workshopDescription}
                onChange={(e) => setWorkshopDescription(e.target.value)}
                disabled={isCreateLoading}
              />
              <DatePicker
                label="Workshop Date"
                value={workshopDate}
                onChange={(newValue) => setWorkshopDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                disabled={isCreateLoading}
              />
              <TextField
                fullWidth
                label="Maximum Capacity"
                type="number"
                variant="outlined"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(Number(e.target.value))}
                inputProps={{ min: 1 }}
                disabled={isCreateLoading}
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
                    required
                    disabled={isCreateLoading}
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
                    required
                    disabled={isCreateLoading}
                  >
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                        <MenuItem key={time} value={time}>{time}</MenuItem>
                      ))}
                  </TextField>
                  {timeSlots.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveTimeSlot(index)}
                      color="error"
                      disabled={isCreateLoading}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  )}
                </Stack>
              ))}

              <Button
                startIcon={<Plus size={18} />}
                onClick={handleAddTimeSlot}
                variant="outlined"
                disabled={isCreateLoading}
              >
                Add Time Slot
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseAddDialog}
              variant="outlined"
              disabled={isCreateLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateWorkshop}
              disabled={isCreateLoading}
            >
              {isCreateLoading ? <CircularProgress size={24} /> : "Create Workshop"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Workshop Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Edit Workshop</Typography>
            <IconButton onClick={handleCloseEditDialog} disabled={isUpdateLoading}>
              <X size={20} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {currentWorkshop && (
              <Stack spacing={3} sx={{ mt: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  fullWidth
                  label="Workshop Title"
                  variant="outlined"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  disabled={isUpdateLoading}
                />
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  disabled={isUpdateLoading}
                />
                <DatePicker
                  label="Workshop Date"
                  value={editDate}
                  onChange={(newValue) => setEditDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                  disabled={isUpdateLoading}
                />
                <TextField
                  fullWidth
                  label="Maximum Capacity"
                  type="number"
                  variant="outlined"
                  value={editMaxCapacity}
                  onChange={(e) => setEditMaxCapacity(Number(e.target.value))}
                  inputProps={{ min: 1 }}
                  disabled={isUpdateLoading}
                />

                <Divider>Time Slots</Divider>

                {editTimeSlots.map((slot, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="center">
                    <TextField
                      select
                      label="Start Time"
                      value={slot.startTime}
                      onChange={(e) => handleEditTimeSlotChange(index, 'startTime', e.target.value)}
                      sx={{ flex: 1 }}
                      InputProps={{
                        endAdornment: <ChevronDown size={18} />,
                      }}
                      required
                      disabled={isUpdateLoading}
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
                      onChange={(e) => handleEditTimeSlotChange(index, 'endTime', e.target.value)}
                      sx={{ flex: 1 }}
                      InputProps={{
                        endAdornment: <ChevronDown size={18} />,
                      }}
                      required
                      disabled={isUpdateLoading}
                    >
                      {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
                        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                    </TextField>
                    {editTimeSlots.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveEditTimeSlot(index)}
                        color="error"
                        disabled={isUpdateLoading}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    )}
                  </Stack>
                ))}

                <Button
                  startIcon={<Plus size={18} />}
                  onClick={handleAddEditTimeSlot}
                  variant="outlined"
                  disabled={isUpdateLoading}
                >
                  Add Time Slot
                </Button>
              </Stack>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={handleCloseEditDialog}
              variant="outlined"
              disabled={isUpdateLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Workshops;