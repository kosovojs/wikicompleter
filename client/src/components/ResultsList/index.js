import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getData } from './slice';

import clsx from 'clsx';
import { toast } from 'react-toastify';

import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { Wikilist, ArticleList } from './as_list';

import { Link } from 'react-router-dom';

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
		cursor: 'pointer'
	},
	floatRight: {
		float: 'right'
	},
	flexContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'end'
	},
	clipboardButton: {
		marginTop: '7px'
	},
	formatButtons: {
		marginTop: '7px'
	}
});

const formatForClipboard = (lang, data) => {
	const items = [];

	data.forEach(item => {
		const [article, iws] = item;
		const formattedTitle = article.replace(/_/g, ' ');

		items.push(`* [[:${lang}:${formattedTitle}|${formattedTitle}]]: ${iws}`);
	});

	return items.join('\n');
};

//https://lv.wikipedia.org/api/rest_v1/page/summary/J%C5%ABd%C5%BE%C4%ABna
class ResultsList extends Component {
	state = {
		anchorEl: null,
		resultFormat: 'list'
	};

	reloadWithoutCache = () => {
		this.props.getData(true);
	};

	setFormat = newValue => {
		this.setState({ resultFormat: newValue });
	};

	copyDataToClipboard = () => {
		const { language, articles } = this.props;

		const text = formatForClipboard(language, articles);

		navigator.clipboard.writeText(text).then(
			function() {
				toast.success('Copied to clipboard!');
			},
			function(err) {
				toast.success('Could not copy to clipboard!');
			}
		);
	};

	render() {
		const { anchorEl, resultFormat } = this.state;
		const {
			classes,
			errorMessage,
			loading,
			error,
			articles,
			time,
			isCached,
			cacheAge,
			language,
			reqID,
			hasRequested,
			reachedMaxStatementTime
		} = this.props;

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

		if (error && errorMessage) {
			return <Typography component={'div'} variant='body1'>{`Error occurred: ${errorMessage}`}</Typography>
		}

		return (
			<div className={classes.root}>
				<Divider />
				<div style={{ marginTop: '10px' }} />
				<Typography component={'div'} variant='body1'>
					{reqID && (
						<div className={clsx(classes.floatRight, classes.flexContainer)}>
							<div className={classes.reqLinks}>
								Request {reqID}: <Link to={`/${reqID}/auto`}>with autoload</Link>,{' '}
								<Link to={`/${reqID}`}>without autoload</Link>
							</div>
							{/* <div className={classes.formatButtons}>
								<ButtonGroup color='primary'>
									<Button variant={resultFormat === 'list' ? "contained": ""} onClick={() => this.setFormat('list')}>List</Button>
									<Button variant={resultFormat === 'wikilist' ? "contained": ""} onClick={() => this.setFormat('wikilist')}>Wikilist</Button>
								</ButtonGroup>
							</div> */}
							{articles.length > 0 &&
							<div className={classes.clipboardButton}>
								<Button
									variant='outlined'
									color='primary'
									onClick={this.copyDataToClipboard}>
									Copy list to clipboard
								</Button>
							</div>}
						</div>
					)}
					{articles.length > 0 ? (
						<>
							{isCached && (
								<>
									<span className={classes.infoText}>
										Showing {cacheAge} seconds old cached version of list.{' '}
										{
											<span
												className={classes.loadWithoutCache}
												onClick={this.reloadWithoutCache}>
												Load live data!
											</span>
										}
									</span>
								</>
							)}


							{resultFormat === 'list' && (
								<ArticleList list={articles} language={language} />
							)}
							{resultFormat === 'wikilist' && (
								<Wikilist list={articles} language={language} />
							)}

							<span className={classes.infoText}>
								Query took {time} seconds to complete
							</span>
						</>
					) : <>

					{reachedMaxStatementTime && <div className={classes.infoText}>
										One or more queries took too long to execute, so these may be incomplete results
					</div>}
					No data
					</>}
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
	errorMessage: data.errorMessage,
	error: data.error,
	articles: data.list,
	time: data.completionTime,
	isCached: data.isCached,
	cacheAge: data.cacheAge,
	reqID: data.reqID,
	hasRequested: data.hasRequested,
	language: main.from,
	reachedMaxStatementTime: data.reachedMaxStatementTime
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ResultsList));
