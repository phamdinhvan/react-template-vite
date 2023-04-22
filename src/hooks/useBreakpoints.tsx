import { useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export function useBreakpoints() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
  })
  const breakpointSm = useMediaQuery(theme.breakpoints.up('sm'))
  const breakpointMd = useMediaQuery(theme.breakpoints.up('md'))
  const breakpointLg = useMediaQuery(theme.breakpoints.up('lg'))
  const breakpointXl = useMediaQuery(theme.breakpoints.up('xl'))

  return {
    /**
     * false < 576 < true
     */
    sm: breakpointSm,
    /**
     * false < 768 < true
     */
    md: breakpointMd,
    /**
     * false < 992 < true
     */
    lg: breakpointLg,
    /**
     * false < 1200 < true
     */
    xl: breakpointXl,
  }
}
