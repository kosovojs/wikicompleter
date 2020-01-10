import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getData } from './slice';

import AsList from './as_list';

import {
	Link
  } from "react-router-dom";

const styles = theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200
		}
	},
	loadingPage: {
		display: 'flex',
		margin: '0 auto'
	},
	loadingPageWrapper: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		top: '0'
	},
	infoText: {
		fontSize: '0.8rem'
	},
	loadWithoutCache: {
		cursor:'pointer'
	},
	floatRight: {
		float: 'right'
	}
});

//https://lv.wikipedia.org/api/rest_v1/page/summary/J%C5%ABd%C5%BE%C4%ABna
class ResultsList extends Component {
	state = {
		anchorEl: null
	};

	reloadWithoutCache = () => {
		this.props.getData(true);
	}

	render() {
		const { anchorEl } = this.state;
		const { classes, loading, articles, time, isCached, cacheAge, language, reqID, hasRequested } = this.props;

		const open = Boolean(anchorEl);

		if (loading) {
			return (
				<div className={classes.loadingPageWrapper}>
					<CircularProgress className={classes.loadingPage} />
				</div>
			);
		}

		if (!hasRequested) {
			return '';
		}

		return (
			<div className={classes.root}>
				<Typography component={'div'} variant='body1'>
							{/* reqID && <span className={classes.floatRight}>
								Request {reqID}: <Link to="/request">with autoload</Link>, <Link to="/users">without autoload</Link>
							</span> */}
					{articles.length > 0 ? (
						<>
							{isCached && (
								<>
								<span className={classes.infoText}>
									Showing {cacheAge} seconds old cached version of list. {/* <span className={classes.loadWithoutCache} onClick={this.reloadWithoutCache}>Load live data!</span> */}
								</span>
								</>
							)}

							<AsList list={articles} language={language} />

							<span className={classes.infoText}>
								Query took {time} seconds to complete
							</span>
						</>
					) : 'No data'}
				</Typography>
			</div>
		);
	}
}

ResultsList.propTypes = {
	classes: PropTypes.object
};

const mapDispatchToProps = { getData };

const mapStateToProps = ({ data, main }) => ({
	loading: data.loading,
	articles: data.list,
	time: data.completionTime,
	isCached: data.isCached,
	cacheAge: data.cacheAge,
	reqID: data.reqID,
	hasRequested: data.hasRequested,
	language: main.from,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResultsList));
