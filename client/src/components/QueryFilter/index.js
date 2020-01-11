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
import Button from '@material-ui/core/Button';

import { toast } from 'react-toastify';

import {withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';
import apiWrapper from '../../api/methods';


import { connect } from 'react-redux';
import { setRequestData } from '../ToolPage/slice';
import { getData } from '../ResultsList/slice';

import SettingsHandler from '../Settings/handler';


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
		margin: theme.spacing(1)
	}
});

const filterProperties = {
	category: { title: '', depth: 0, talk: false },
	template: {title: '', talk: false},
	petscan: { id: '' }
}


const filterPlaceholder = { type: 'category', specific: { title: '', depth: 0, talk: false } };

class QueryFilter extends Component {
	settingsHandler = null;
	state = {
		filterChanged: false,
		inputLanguage: '',
		project: 'wikipedia',
		targetLanguage: '',
		titleLanguage: '',
		output: 'list',
		outputOptions: ['list', 'json', 'table'],
		onlyArticles: true,
		filters: [
			filterPlaceholder,
			//{ type: 'template', specific: { title: '', talk: false } },
			//{ type: 'petscan', specific: { id: '' } }
			//{ type: 'pagelinks', specific: { title: '', mode:'linksto' } },//'linksfrom'
			//{ type: null },
		]
	};

	handleChange = event => {
		const { name, value, checked, type } = event.target;

		this.setState({ [name]: type === 'checkbox' ? checked : value });
	};

	handleFilterChange = filterIndex => event => {
		const { name, value, checked, type } = event.target;
		const inputValue = type === 'checkbox' ? checked : value;

		const newFilter = [...this.state.filters];

		if (name === 'type') {
			newFilter[filterIndex] = {
				specific: filterProperties[inputValue],
				[name]: inputValue
			};
			this.setState({ filters: newFilter, filterChanged: true });
			return;
		}

		if (inputValue.length > 0 && name === 'depth') {
			const numericalValue = parseInt(inputValue);
			if (numericalValue > 10 || numericalValue < 0) {
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
		};
		newFilter[filterIndex] = currentFilter;

		this.setState({ filters: newFilter, filterChanged: true });
	};

	removeFilter = ind => {
		this.setState({ filters: this.state.filters.filter((item, counter) => counter !== ind), filterChanged: true });
	};

	addFilter = ind => {
		//teorētiski jau varētu ielikt kā nākamo pēc 'ind'
		this.setState({ filters: [
			...this.state.filters,
			{ type: 'category', specific: filterProperties.category }
		], filterChanged: true });
	}

	submit = () => {
		const {inputLanguage, targetLanguage, titleLanguage, filters, filterChanged} = this.state;
		if (filterChanged) {
			this.props.history.push('/');
			this.setState({filterChanged: false})
		}

		if (inputLanguage == '') {
			toast.warn(`Please add input language`, { autoClose: 7500 });
			return;
		}

		if (targetLanguage == '') {
			toast.warn(`Please add target language`, { autoClose: 7500 });
			return;
		}

		if (inputLanguage === targetLanguage) {
			toast.warn(`Input and target languages are the same!`, { autoClose: 7500 });
			return;
		}

		if (filters.length === 0) {
			toast.warn(`Add at least one filter`, { autoClose: 7500 });
			return;
		}

		let wasFilterError = false;
		filters.forEach((item, ind) => {
			if (wasFilterError) {
				return;
			}
			const {type, specific} = item;
			if (type === 'category') {
				if (specific.title === '') {
					toast.warn(`Please fill filter nr. ${(ind+1)}`, { autoClose: 7500 });
					wasFilterError = true;
					return;
				}
			} else if (type === 'template') {
				if (specific.title === '') {
					toast.warn(`Please fill filter nr. ${(ind+1)}`, { autoClose: 7500 });
					wasFilterError = true;
					return;
				}
			} else if (type === 'petscan') {
				if (specific.id === '') {
					toast.warn(`Please fill filter nr. ${(ind+1)}`, { autoClose: 7500 });
					wasFilterError = true;
					return;
				}
			}
		})
		if (wasFilterError) {
			return;
		}

		this.props.setRequestData(inputLanguage, targetLanguage, filters);
		this.props.getData();
	}

	handleURLParams = () => {
		const {id, auto} = this.props.match.params;
		if (id) {
			apiWrapper.tool.reqData(id)
				.then(res => {
					if ('error' in res) {
						toast.error(`No such request ID`, {autoClose: 10000});
						this.setState({
							filters: [filterPlaceholder],
							inputLanguage: '',
							targetLanguage: ''
						})
						return;
					}

					const {filters, from, to} = res;
					this.setState({
						filters,
						inputLanguage: from,
						targetLanguage: to
					}, () => {
						if (auto === 'auto') {
							this.submit();
						}
					})
				})
		} else {
			const {from, to, filter} = this.settingsHandler.getSettings();

			const newFilters = filter === '' ? [filterPlaceholder] : [{
				specific: filterProperties[filter],
				type: filter
			}];

			this.setState({
				targetLanguage: to,
				inputLanguage: from,
				filters: newFilters
			})

		}
	}

	componentDidMount() {
		this.settingsHandler = new SettingsHandler();
		this.handleURLParams();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id || this.props.match.params.auto !== prevProps.match.params.auto) {
			this.handleURLParams();
		}
	}

	render() {
		const { inputLanguage, targetLanguage, onlyArticles, filters } = this.state;
		const { classes, dataLoading } = this.props;

		return (
			<div className={classes.root}>
				<TextField
					label='Input language'
					name='inputLanguage'
					onChange={this.handleChange}
					value={inputLanguage}
					size='small'
					variant='outlined'
					margin='dense'
				/>
				<TextField
					label='Without interwiki to'
					name='targetLanguage'
					onChange={this.handleChange}
					value={targetLanguage}
					size='small'
					variant='outlined'
					margin='dense'
				/>
				{/* <TextField
					label='Use titles from this language'
					name='titleLanguage'
					onChange={this.handleChange}
					value={titleLanguage}
					size='small'
					variant='outlined'
					margin='dense'
				/> */}
				{/* <FormControlLabel
					control={
						<Switch
							checked={onlyArticles}
							onChange={this.handleChange}
							name='onlyArticles'
						/>
					}
					label='Include only articles'
				/> */}
				<br />
				{filters.map((item, ind) => {
					const { type, specific } = item;
					return (
						<div key={ind}>
							<Divider light />
							<IconButton aria-label='delete' className={classes.margin} onClick={() => this.addFilter(ind)}>
								<AddIcon fontSize='small' />
							</IconButton>
							{filters.length > 1 && (
								<IconButton
									aria-label='delete'
									className={classes.margin}
									onClick={() => this.removeFilter(ind)}>
									<DeleteIcon fontSize='small' />
								</IconButton>
							)}
							<FormControl variant='outlined' className={classes.formControl}>
								<InputLabel htmlFor='outlined-age-simple'>Filter type</InputLabel>
								<Select
									margin='dense'
									value={type}
									name='type'
									onChange={this.handleFilterChange(ind)}
									input={<OutlinedInput name='age' id='outlined-age-simple' />}>
									<MenuItem value={'category'}>Category</MenuItem>
									<MenuItem value={'petscan'}>Petscan</MenuItem>
									<MenuItem value={'template'}>Template</MenuItem>
									{/* <MenuItem value={'pagelinks'}>Pagelinks</MenuItem> */}
								</Select>
							</FormControl>
							{type === 'category' && (
								<>
									<TextField
										label='Category title'
										name='title'
										onChange={this.handleFilterChange(ind)}
										value={specific.title}
										//size='small'
										variant='outlined'
										margin='dense'
										style={{ margin: 8, width: '300px' }}
										fullWidth
									/>
									<TextField
										label='Depth'
										name='depth'
										type='number'
										inputProps={{ min: '0', max: '10', step: '1' }}
										onChange={this.handleFilterChange(ind)}
										value={specific.depth}
										size='small'
										variant='outlined'
										margin='dense'
									/>
									{/* <FormControlLabel
									control={
										<Switch
											checked={specific.talk}
											onChange={this.handleFilterChange(ind)}
											name='talk'
										/>
									}
									label='Use talk pages instead'
								/> */}
								</>
							)}
							{type === 'template' && (
								<>
									<TextField
										label='Template title'
										name='title'
										onChange={this.handleFilterChange(ind)}
										value={specific.title}
										size='small'
										variant='outlined'
										margin='dense'
										style={{ margin: 8, width: '300px' }}
										fullWidth
									/>
									{/* <FormControlLabel
									control={
										<Switch
											checked={specific.talk}
											onChange={this.handleFilterChange(ind)}
											name='talk'
										/>
									}
									label='Use talk pages instead'
								/> */}
								</>
							)}
							{type === 'pagelinks' && (
								<>
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
											input={
												<OutlinedInput
													name='age'
													id='outlined-age-simple'
												/>
											}>
											<MenuItem value={'linksto'}>WhatLinksHere</MenuItem>
											<MenuItem value={'linksfrom'}>Links on page</MenuItem>
										</Select>
									</FormControl>
								</>
							)}
							{type === 'petscan' && (
								<>
									<TextField
										label='Petscan ID'
										name='id'
										onChange={this.handleFilterChange(ind)}
										value={specific.id}
										size='small'
										variant='outlined'
										margin='dense'
										style={{ margin: 8, width: '300px' }}
										fullWidth
									/>
								</>
							)}
						</div>
					);
				})}
				<Button disabled={dataLoading} variant="contained" color="primary" disableelevation="true" onClick={this.submit}>Submit</Button>
				<div style={{marginBottom:'15px'}} />
			</div>
		);
	}
}

QueryFilter.propTypes = {
	classes: PropTypes.object
};

const mapDispatchToProps = { setRequestData, getData };
const mapStateToProps = state => ({
	dataLoading: state.data.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withRouter(QueryFilter)));
