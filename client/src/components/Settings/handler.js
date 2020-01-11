class SettingsHandler {
	getSettings = () => {
		const defaults = localStorage.getItem('completer-tool');
		if (defaults == null) {
			return {filter: '',from:'',to:''};
		}

		const parsed = JSON.parse(defaults);

		return parsed;
	}

	saveSettings = (props) => {
		localStorage.setItem('completer-tool', JSON.stringify(props));

		return true;
	}
}

export default SettingsHandler;
