import React from 'react';
import QueryFilter from '../QueryFilter';
import ResultsList from '../ResultsList';
import Typography from '@material-ui/core/Typography';

const MainPage = () => {
	return (
		<div>
			<Typography variant='h4'>Missing articles</Typography>
			<Typography style={{marginBottom: '10px'}} component={'div'} variant='body1'>
				List articles from one Wikipedia containing the most interwikis without article in
				target Wikipedia
			</Typography>
			<QueryFilter />
			<ResultsList />
		</div>
	);
};

export default MainPage;
