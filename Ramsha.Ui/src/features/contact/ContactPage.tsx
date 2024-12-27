
import { Box, CardMedia, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContactForm } from './ContactForm';


const ContactPage = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        p: {
          xs: '16px 16px 0px 16px',
          sm: '16px 16px 0px 16px',
          md: '24px 32px 0px 32px'
        },

      }}>

      <Paper sx={{ minHeight: '90vh', mb: 2, padding: { sx: '16px', md: '32px' }, backgroundColor: 'Background.paper' }} elevation={4}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: '16px'

            }}>
            <CardMedia
              component="img"

              image={'email.png'}
              alt={'contact img'}
              sx={{
                objectFit: "cover",
                borderRadius: '0.8rem',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: '16px'

            }}>
            <Typography mb={2} variant="h6">{t('get-in-touch')}</Typography>
            <ContactForm />
          </Grid>

        </Grid>
      </Paper>
    </Box>
  )
}


export default ContactPage;
