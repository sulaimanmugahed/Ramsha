import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledSection = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6, 2),
  background: theme.palette.background.default,
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15)`,
}));

const AboutPage = () => {
  return (
    <Box
      id="about-page"
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          textAlign: 'center',
          pt: { xs: 10, sm: 14 },
          pb: { xs: 6, sm: 10 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          About Ramsha
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: 'text.secondary',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Welcome to Ramsha, your one-stop multi-category shopping destination. We are dedicated to
          connecting customers with trusted suppliers, providing a vast selection of products to
          meet your every need. Discover quality, variety, and convenience like never before.
        </Typography>
      </Container>

      {/* Mission Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            At Ramsha, our mission is to empower individuals and businesses with seamless access to
            products and services. We strive to create an inclusive platform that fosters trust,
            quality, and innovation for a global marketplace.
          </Typography>
        </Container>
      </StyledSection>

      {/* Team Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 6,
            textAlign: 'center',
          }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3, 4].map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member}>
              <Card
                sx={{
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: 'hidden',
                  p: 2,
                }}
              >
                <StyledAvatar
                  alt={`Team Member ${member}`}
                  src={`/static/images/avatar/avatar-${member}.jpg`}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Sulaiman Mugahed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CEO & Founder
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


    </Box>
  );
}

export default AboutPage;
