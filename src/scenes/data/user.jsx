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

const User = () => {
  const [ userData, setUserData ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    new Fetcher()
    .readUsers(token)
    .then(data => {
      const transformedData = data.users.map((user, i) => ({
        id: user.id,
        userName: user.userName,
        gender: user.gender, 
        email: user.email,
        isVerified: user.isVerified,
        access: user.isAdmin ? 'admin' : 'user', 
      }))   
      setUserData(transformedData)
      setLoading(false)
    })
  }, [token])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      type: 'text',
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isVerified",
      headerName: "Verified",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
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
    window.location.href = `/admin/user-form/${id}`
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const response = await new Fetcher()
      .deleteUser(id, token)
  
      if (response.status === 'success') setUserData((oldData) => oldData.filter((user) => user.id !== id))
    }
  }

  return (
    <Box m="20px">
      <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Header title="Users" subtitle="Managing the User Data" />

        <Link to='/admin/user-form' style={{ textDecoration: 'none' }}>
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
                Create User
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
        <DataGrid loading={loading} checkboxSelection rows={userData} columns={columns} />
      </Box>
    </Box>
  );
};

export default User;
