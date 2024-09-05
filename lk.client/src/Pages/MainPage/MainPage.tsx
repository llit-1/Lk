import { AppBar, Toolbar, Paper, Button, Box , Avatar} from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

function MainPage () {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

  return (
    <>
    <AppBar position="static" sx={{height: 50, backgroundColor: "#F47920", border: "none"}}>
      <Toolbar sx={{width: "100%"}}>
        <Box sx={{width: "100%", display: 'flex', justifyContent: "start", gap: 10}}>
          <Button color="inherit">Моя зарплата</Button>
          <Button color="inherit">Мой график</Button>
          <Button color="inherit">Поддержка</Button>
        </Box>
        <Box>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Кургузов Владислав" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
        </Box>
      </Toolbar>
    </AppBar>

    <Paper elevation={3} />
    <Paper elevation={3} />
    <Paper elevation={3} />
    <Paper elevation={3} />
    </>
  )
}

export default MainPage