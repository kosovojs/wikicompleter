import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	col3: {
		columnCount: 1,

		[theme.breakpoints.up('sm')]: {
			columnCount: 2
		},
		[theme.breakpoints.up('md')]: {
			columnCount: 3
		}
	},
	col2: {
		columnCount: 2
	},
	removedUnderline: {
		textDecoration: 'none'
	}
}));

const ArticleList = ({ list, language }) => {
	const classes = useStyles();

	return (
		<div className={classes.col3}>
			<ul>
				{list.map(item => {
					const [article, iws] = item;

					return (
						<li key={article}>
							<a
								className={classes.removedUnderline}
								href={`https://${language}.wikipedia.org/wiki/${article}`}
								target='_blank'>
								{article.replace(/_/g, ' ')}
							</a>
							: {iws}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const Wikilist = ({ list, language }) => {
	const classes = useStyles();

	return (
		<div className={classes.col3}>
				{list.map(item => {
					const [article, iws] = item;
					const formattedTitle = article.replace(/_/g, ' ');

					return (
						<div key={article}>
							{'* '}{'[['}<a
								className={classes.removedUnderline}
								href={`https://${language}.wikipedia.org/wiki/${article}`}
								target='_blank'>
								{formattedTitle}
							</a>{']]'}
							: {iws}
						</div>
					);
				})}
		</div>
	);
};

export {
	ArticleList, Wikilist
};
