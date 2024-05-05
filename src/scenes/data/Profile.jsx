import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import { Fetcher } from "../../utils";
import { arrayBufferToBase64 } from "../../utils";

const Profile = () => {
  const [ profileData, setProfileData ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    new Fetcher()
    .readProfiles(token)
    .then(data => {
      const transformedData = data.profiles.map((profile, i) => ({
        id: profile.id,
        userName: profile.user.userName,
        image: profile.picture.data,
        email: profile.user.email,
      }))   
      setProfileData(transformedData)
      setLoading(false)
    })
  }, [token])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: 'image',
      headerName: 'Image',
      editable: true,
      renderCell: (params) => <img style={{ width: 40, height: 40, borderRadius: '50%' }} src={params?.row.image ? `data:image/jpeg;base64,${arrayBufferToBase64(params.row.image)}` : '../../assets/user.png'} />,
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor='blue'
            borderRadius="4px"
            onClick={() => handleUpdate(params.row.id)}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Update
            </Typography>
          </Box>        
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor='red'
            borderRadius="4px"
            onClick={() => handleDelete(params.row.id)}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Delete
            </Typography>
          </Box>           </>
      ),
    },
  ];

  const handleUpdate = async (id) => {
    window.location.href = `/admin/profile-form/${id}`
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const response = await new Fetcher()
      .deleteProfile(id, token)
  
      if (response.status === 'success') setProfileData((oldData) => oldData.filter((profile) => profile.id !== id))
    }
  }

  return (
    <Box m="20px">
      <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Header title="Profiles" subtitle="Managing User Profiles" />

        <Link to='/admin/profile-form' style={{ textDecoration: 'none' }}>
          <Box             
              width="100%"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor='white'
              fontWeight={800}
              color='blue'
              borderRadius="4px"
              onClick={() => {}}>
                Create Profile
            </Box>
        </Link>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid loading={loading} checkboxSelection rows={profileData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Profile;
