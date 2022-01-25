import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: { // when screen is small or above, display: block
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) }, // alpha is for opacity
    marginRight: theme.spacing(2), // 2 * 8 = 18px
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: 
    { 
        marginLeft: theme.spacing(3), // 3 * 8 = 24px
        width: 'auto' 
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2), // padding: 0 (up and down) 16 (right and left)
    height: '100%', 
    position: 'absolute', 
    pointerEvents: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), 
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, 
    transition: theme.transitions.create('width'), width: '100%', 
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
  toolbar: {
    display: 'flex', justifyContent: 'space-between',
  },
}));