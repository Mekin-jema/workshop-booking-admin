import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
// Remove MUI icon import
// import { Save as SaveIcon } from "@mui/icons-material";
import { Save } from "lucide-react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="General" />
            <Tab label="Notifications" />
            <Tab label="Security" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Box component="form" sx={{ maxWidth: 600 }}>
            <TextField
              fullWidth
              label="WorkshopHub Name"
              defaultValue="WorkshopHub"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Timezone"
              select
              defaultValue="UTC"
              variant="outlined"
              sx={{ mb: 3 }}
              SelectProps={{ native: true }}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time (EST)</option>
              <option value="PST">Pacific Time (PST)</option>
            </TextField>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Enable public registration"
              sx={{ mb: 3 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Require email verification"
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box component="form" sx={{ maxWidth: 600 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email notifications"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="New workshop notifications"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Booking confirmations"
              sx={{ mb: 2 }}
            />
            <FormControlLabel control={<Switch />} label="Promotional emails" />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Box component="form" sx={{ maxWidth: 600 }}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Two-factor authentication"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Session timeout (minutes)"
              type="number"
              defaultValue="30"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Allowed IP addresses (comma separated)"
              variant="outlined"
              placeholder="192.168.1.1, 10.0.0.1"
            />
          </Box>
        </TabPanel>

        <Box sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>
          <Button variant="contained" color="primary" startIcon={<Save size={20} />}>
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
