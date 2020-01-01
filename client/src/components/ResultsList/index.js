import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200
		}
	},

	popover: {
		pointerEvents: 'none'
	},

	paper: {
		padding: theme.spacing(1)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	margin: {
		margin: theme.spacing(1)
	}
});

//https://lv.wikipedia.org/api/rest_v1/page/summary/J%C5%ABd%C5%BE%C4%ABna
class ResultsList extends Component {
	state = {
		anchorEl: null
	};

	handlePopoverOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handlePopoverClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;
		const { classes } = this.props;

		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				{JSON.stringify(open)}
				<Typography
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={this.handlePopoverOpen}
					onMouseLeave={this.handlePopoverClose}>
					Hover with a Popover.
				</Typography>
				<Typography
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={this.handlePopoverOpen}
					onMouseLeave={this.handlePopoverClose}>
					Hover with a Popover.
				</Typography>
				<Typography
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={this.handlePopoverOpen}
					onMouseLeave={this.handlePopoverClose}>
					Hover with a Popover.
				</Typography>
				<Typography
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={this.handlePopoverOpen}
					onMouseLeave={this.handlePopoverClose}>
					Hover with a Popover.
				</Typography>
				<Typography
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={this.handlePopoverOpen}
					onMouseLeave={this.handlePopoverClose}>
					Hover with a Popover.
				</Typography>

				<Popover
					id='mouse-over-popover'
					open={open}
					anchorEl={anchorEl}
					onClose={this.handlePopoverClose}
					disableRestoreFocus
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'center'
					}}
					className={classes.popover}
					classes={{
						paper: classes.paper
					}}>
					The content of the Popover.
				</Popover>
			</div>
		);
	}
}

ResultsList.propTypes = {
	classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(ResultsList);
