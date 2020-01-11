import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';

import SettingsHandler from './handler';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200
		}
	}
}));

function Settings({ modalOpenHandle, isOpen }) {
	const classes = useStyles();
	const [inputLanguage, setInputLanguage] = React.useState('');
	const [targetLanguage, setTargetLanguage] = React.useState('');
	const [defaultFilter, setDefaultFilter] = React.useState('');
	let handler = new SettingsHandler();

	useEffect(() => {
		const settingsFromLocalStorage = handler.getSettings();
		setInputLanguage(settingsFromLocalStorage['from']);
		setTargetLanguage(settingsFromLocalStorage['to']);
		setDefaultFilter(settingsFromLocalStorage['filter']);
	}, []);

	const handleClose = () => {
		modalOpenHandle(false);
	};

	const handleSave = () => {
		const status = handler.saveSettings({from:inputLanguage,to:targetLanguage,filter:defaultFilter});
		if (status) {
			toast.success('Saved settings!');
		}
	};

	return (
		<div className={classes.root}>
			<Dialog
				fullWidth={true}
				disableEnforceFocus={false}
				open={isOpen}
				aria-labelledby='form-dialog-title'
				maxWidth='sm'>
				<DialogTitle id='form-dialog-title'>Settings</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your settings will be remembered on the same browser and computer.
					</DialogContentText>
					<div className={classes.root}>
						<TextField
							margin='dense'
							id='name'
							label='Default input language'
							type='text'
							onChange={ev => setInputLanguage(ev.target.value)}
							value={inputLanguage}
						/>
						<TextField
							margin='dense'
							id='name'
							label='Default target language'
							type='text'
							onChange={ev => setTargetLanguage(ev.target.value)}
							value={targetLanguage}
						/>
						<TextField
							margin='dense'
							select
							label='Default filter'
							value={defaultFilter}
							onChange={ev => setDefaultFilter(ev.target.value)}>
							{['','category', 'petscan', 'template'].map(option => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSave} color='secondary'>
						Save
					</Button>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Settings;
