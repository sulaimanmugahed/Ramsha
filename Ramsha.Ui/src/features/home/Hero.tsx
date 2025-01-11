import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import { AppImage } from '../../app/components/ui/AppImage';
import AppSlider from '../../app/components/ui/AppSlider';
import { useCatalogCategories, useCatalogProducts } from '../../app/hooks/catalogHooks';
import ProductCard from '../catalog/ProductCard';
import CategoryCard from '../categories/CategoryCard';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  // borderRadius: theme.shape.borderRadius,
  // outline: '6px solid',
  // outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  // border: '1px solid',
  // borderColor: theme.palette.grey[200],
  // boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  // backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard.jpg'})`,
  // backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 'auto',
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

const StyledText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  fontSize: '4rem',
  fontWeight: 800,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  lineHeight: 1.2,
  letterSpacing: '0.1em',
  textShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  [theme.breakpoints.up('sm')]: {
    fontSize: '5rem',
  },
}));

export default function Hero() {


  const { products } = useCatalogProducts({
    paginationParams: { pageNumber: 1, pageSize: 20 }

  })


  const { categories } = useCatalogCategories()


  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            pt: { xs: 5, sm: 6 },
            pb: { xs: 3, sm: 4 },
          }}
        >
          {/* Left Section: Logo */}
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 4, md: 0 },
            }}
          >
            <AppImage sx={{ width: '70%', height: '70%' }} src='ramsha-logo3.png' />
          </Box>

          <Stack
            spacing={3}
            sx={{
              width: { xs: '100%', md: '60%' },

              px: { xs: 2, md: 4 },

            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'text.primary',
              }}
            >
              Marketplace&nbsp;of&nbsp;
              <Typography
                variant="h5"
                component="span"
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  color: 'primary.main',
                }}
              >
                Endless Opportunities
              </Typography>
            </Typography>

            <Typography
              variant="body1"
              sx={{

                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' },

              }}
            >
              Your ultimate multi-category shopping destination, connecting you with trusted
              suppliers and a world of unique products. Experience variety, quality, and
              convenience—all in one place.
            </Typography>
          </Stack>
        </Container>
        <StyledBox sx={{ p: 2 }} id="image" >
          <Box sx={{ mb: 4 }}>
            <Typography color={'primary'} sx={{ mb: 2 }} variant='h5' fontWeight={'bold'}>Latest Products</Typography>

            {
              products &&
              <AppSlider
                infinite={products.length >= 3}
                slidesToShow={3}
                items={products}
                centerMode
                renderItem={(product) => (
                  <Box sx={{ p: 2 }}>
                    <ProductCard product={product} />
                  </Box>
                )}
              />
            }
          </Box>

          <Box>
            <Typography color={'primary'} sx={{ mb: 2 }} variant='h5' fontWeight={'bold'}>Categories</Typography>

            {
              categories &&
              categories.filter(x => !x.parentId).map(fatherCat => (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>{fatherCat.label}</Typography>
                  <AppSlider
                    centerMode
                    slidesToShow={4}
                    infinite={categories.length >= 3}
                    items={categories.filter(x => x.parentId === fatherCat.id)}
                    renderItem={(category) => (
                      <Box sx={{ p: 2 }}>
                        <CategoryCard category={category} />
                      </Box>
                    )}
                  />
                </Box>
              ))

            }

          </Box>
        </StyledBox>
      </Container>
    </Box>
  );
}