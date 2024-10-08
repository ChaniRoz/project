import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { currentUser, deleteUser, signOut, updateUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function UserActions() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openProfile, setOpenProfile] = React.useState(false);

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(currentUser.email))
  };

  const handleEditUser = () => {
    setOpenedit(!openedit)
    handleClickProfile()
    const user = {
      name,
      email,
      phone,
      password
    }
    dispatch(updateUser(user))
    handleClose()
  };

  const handleCloseEditUser = () => {
    setOpenedit(!openedit)
    setOpenProfile(!openProfile);
  }

  const [openedit, setOpenedit] = React.useState(false);
  const [email, setEmail] = React.useState(currentUser.email)
  const [name, setName] = React.useState(currentUser.name)
  const [phone, setPhone] = React.useState(currentUser.phone)
  const [password, setPassword] = React.useState(currentUser.password)
  const handleSignOut = () => {
    alert('You Sign Out!')
    dispatch(signOut)
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            😀 Hi <span id="username">{currentUser.name}</span>!
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog
        open={openProfile}
        onClose={handleClickProfile}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            console.log(name);
            handleClickProfile();
          },
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <span>name={currentUser.name}</span>
        <span>email={currentUser.email}</span>
        <span>phone={currentUser.phone}</span>
        <DialogActions>
          <Button onClick={handleClickProfile}>close</Button>
          <IconButton onClick={handleDeleteUser} aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleCloseEditUser} aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openedit}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={currentUser.name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="string"
            fullWidth
            variant="standard"
            defaultValue={currentUser.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={currentUser.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditUser}>Cancel</Button>
          <Button onClick={handleEditUser} type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box >

  );
}