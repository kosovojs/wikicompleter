import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200
		}
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	margin: {
	  margin: theme.spacing(1),
	},
});

class QueryFilter extends Component {
	state = {
		inputLanguage: 'en',
		project: 'wikipedia',
		targetLanguage: 'lv',
		output: 'list',
		outputOptions: ['list', 'json', 'table'],
		onlyArticles: true,
		filters: [
			{ type: 'category', specific: { title: '', depth: 0, talk: false } },
			{ type: 'template', specific: { title: '', talk: false } },
			{ type: 'petscan', specific: { id: '' } },
			{ type: 'pagelinks', specific: { title: '', mode:'linksto' } },//'linksfrom'
			//{ type: null },
		]
	};

	handleChange = event => {
		const { name, value, checked, type } = event.target;

		this.setState({ [name]: type === 'checkbox' ? checked : value });
	};

	handleFilterChange = filterIndex => event => {
		const { name, value, checked, type } = event.target;
		console.log({ name, value, checked, type }, filterIndex);
		const inputValue = type === 'checkbox' ? checked : value;

		const newFilter = [...this.state.filters];

		if (name === 'type') {
			newFilter[filterIndex] = {
				...newFilter[filterIndex],
				[name]: inputValue
			};
			this.setState({ filters:newFilter });
			return;
		}

		if (inputValue.length>0 && name === 'depth') {
			const numericalValue = parseInt(inputValue);
			if (numericalValue >10 || numericalValue < 0) {
				return;
			}
		}

		let currentFilter = newFilter[filterIndex];

		currentFilter = {
			...currentFilter,
			specific: {
				...currentFilter.specific,
				[name]: inputValue
			}
		}
		newFilter[filterIndex] = currentFilter;

		this.setState({ filters:newFilter });
	};

	removeFilter = (ind) => {
		this.setState({ filters:this.state.filters.filter((item, counter)  => counter !== ind)});
	}

	render() {
		const { inputLanguage, targetLanguage, onlyArticles, filters } = this.state;
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<TextField
					label='Input language'
					name='inputLanguage'
					onChange={this.handleChange}
					helperText='Some important text'
					value={inputLanguage}
					size='small'
					variant='outlined'
					margin='dense'
				/>
				<TextField
					label='Target language'
					name='targetLanguage'
					onChange={this.handleChange}
					helperText='Without interwiki to'
					value={targetLanguage}
					size='small'
					variant='outlined'
					margin='dense'
				/>
				<FormControlLabel
					control={
						<Switch
							checked={onlyArticles}
							onChange={this.handleChange}
							name='onlyArticles'
						/>
					}
					label='Include only articles'
				/>
				<br />
				{filters.map((item, ind) => {
					const {type, specific} = item;
					return (
						<div key={ind}>
							<Divider />
							<IconButton aria-label="delete" className={classes.margin}>
          <AddIcon fontSize="small" />
        </IconButton>
		<IconButton aria-label="delete" className={classes.margin} onClick={() => this.removeFilter(ind)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel htmlFor='outlined-age-simple'>Filter type</InputLabel>
								<Select
									margin='dense'
									value={type}
									name='type'
									onChange={this.handleFilterChange(ind)}
									input={<OutlinedInput name='age' id='outlined-age-simple' />}>
									<MenuItem value={'category'}>Category</MenuItem>
									<MenuItem value={'template'}>Template</MenuItem>
									<MenuItem value={'pagelinks'}>Pagelinks</MenuItem>
									<MenuItem value={'petscan'}>Petscan</MenuItem>
								</Select>
							</FormControl>
							{
								type === 'category' && <>
								<TextField
									label='Category title'
									name='title'
									onChange={this.handleFilterChange(ind)}
									value={specific.title}
									size='small'
									variant='outlined'
									margin='dense'
								/>
								<TextField
									label='Recurse category'
									name='depth'
									type="number"
									inputProps={{ min: "0", max: "10", step: "1" }}
									onChange={this.handleFilterChange(ind)}
									value={specific.depth}
									size='small'
									variant='outlined'
									margin='dense'
								/>
								<FormControlLabel
									control={
										<Switch
											checked={specific.talk}
											onChange={this.handleFilterChange(ind)}
											name='talk'
										/>
									}
									label='Use talk pages instead'
								/>
								</>
							}
							{
								type === 'template' && <>
								<TextField
									label='Template title'
									name='title'
									onChange={this.handleFilterChange(ind)}
									value={specific.title}
									size='small'
									variant='outlined'
									margin='dense'
								/>
								<FormControlLabel
									control={
										<Switch
											checked={specific.talk}
											onChange={this.handleFilterChange(ind)}
											name='talk'
										/>
									}
									label='Use talk pages instead'
								/>
								</>
							}
							{
								type === 'pagelinks' && <>
								<TextField
									label='Article title'
									name='title'
									onChange={this.handleFilterChange(ind)}
									value={specific.title}
									size='small'
									variant='outlined'
									margin='dense'
								/>
								<FormControl variant='outlined' className={classes.formControl}>
									<InputLabel htmlFor='outlined-age-simple'>Mode</InputLabel>
									<Select
										margin='dense'
										value={specific.mode}
										name='mode'
										onChange={this.handleFilterChange(ind)}
										input={<OutlinedInput name='age' id='outlined-age-simple' />}>
										<MenuItem value={'linksto'}>WhatLinksHere</MenuItem>
										<MenuItem value={'linksfrom'}>Links on page</MenuItem>
									</Select>
								</FormControl>
								</>
							}
							{
								type === 'petscan' && <>
								<TextField
									label='Petscan ID'
									name='id'
									onChange={this.handleFilterChange(ind)}
									value={specific.id}
									size='small'
									variant='outlined'
									margin='dense'
								/>
								</>
							}

						</div>
					);
				})}
			</div>
		);
	}
}

QueryFilter.propTypes = {
	classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(QueryFilter);
