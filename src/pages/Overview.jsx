import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const activityData = [
  { name: 'Mon', users: 4 },
  { name: 'Tue', users: 7 },
  { name: 'Wed', users: 5 },
  { name: 'Thu', users: 9 },
  { name: 'Fri', users: 6 },
  { name: 'Sat', users: 8 },
  { name: 'Sun', users: 10 },
];

function Overview() {
  const { darkMode } = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: darkMode ? '#1f2937' : '#fff',
              color: darkMode ? '#fff' : '#22223b',
            }}
          >
            <PeopleIcon sx={{ fontSize: 60, color: darkMode ? '#fde68a' : 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" sx={{ color: darkMode ? '#fff' : '#22223b' }}>
              User Management
            </Typography>
            <Typography color={darkMode ? 'grey.400' : 'text.secondary'}>
              View and manage all users in the system
            </Typography>
          </Paper>
        </Grid>
        {/* Create New User section full width */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              width:275,
              alignItems: 'center',
              textAlign:'center',
              justifyContent: 'center',
              bgcolor: darkMode ? '#1f2937' : '#fff',
              color: darkMode ? '#fff' : '#22223b',
            }}
          >
            <PersonAddIcon sx={{ fontSize: 60, color: darkMode ? '#fde68a' : 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" sx={{ color: darkMode ? '#fff' : '#22223b', cursor: "pointer"}}>
              <Link 
              to= "/dashboard/user-form"
              >
                Create New User
              </Link>
              
            </Typography>
            <Typography sx={{ color: darkMode ? 'grey.400' : 'text.secondary' }}>
              Add new users to the system
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* User Activity Chart */}
      <Box
        sx={{
          mt: 5,
          p: 3,
          background: darkMode ? '#1f2937' : '#fff',
          borderRadius: 3,
          boxShadow: 2,
          color: darkMode ? '#fff' : '#22223b',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: darkMode ? '#fff' : '#22223b' }}>
          User Activity (Last 7 Days)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Overview; 