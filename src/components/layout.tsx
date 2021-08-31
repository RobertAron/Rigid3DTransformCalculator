import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core"


const Layout: React.FC = ({children}) => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Container>
            <Typography variant='h6' component='div'>RIGID 3D TRANSFORM CALCULATOR</Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{padding: theme => `${theme.spacing(2)} 0px`}}>
        {children}
      </Box>
    </>
  )
}



export {
  Layout
}