import React, {useState, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import BugReportIcon from '@material-ui/icons/BugReport';

import Settings from '../Settings';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	removedShadow: {
		boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)'
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

function Header() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(open);
	}, [open]);

	const handleModalToggle = (newValue) => {
		setOpen(newValue);
	}

	return (<>
		<div className={classes.grow}>
			<AppBar position='sticky' className={classes.removedShadow}>
				<Toolbar>
					<NavLink to='/' style={{ textDecoration: 'none', color: 'unset' }}>
						<Typography className={classes.title} variant='h6' noWrap>
							WikiCompleter
						</Typography>
					</NavLink>
					<div className={classes.grow} />
					<MenuItem onClick={() => setOpen(true)}>
						Settings
					</MenuItem>
					<MenuItem onClick={() => window.open(`https://github.com/kosovojs/missing-tool`)}>
						<GitHubIcon />
					</MenuItem>
					<MenuItem onClick={() => window.open(`https://github.com/kosovojs/missing-tool/issues`)}>
						<BugReportIcon />
					</MenuItem>
				</Toolbar>
			</AppBar>
		</div>
			{open && <Settings isOpen={open} modalOpenHandle={handleModalToggle} />}
			</>
	);
}

export default Header;
