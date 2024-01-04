import React from 'react';
import './App.css';
import NewFormValue from './NewList';
import Forms from './Form';

function App() {
	const [allLists, setAllLists] = React.useState<any>([]);
	const [formValue, setFormValue] = React.useState('');
	const [formKey, setFormKey] = React.useState('');
	const [isCopied, setIsCoped] = React.useState({ type: '', copied: false });

	React.useEffect(() => {
		let timeOut = setTimeout(() => {
			setIsCoped({ type: '', copied: false });
		}, 6000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [isCopied]);

	const onNewFormDetailsChange = (e: any, setterFunction: any) => {
		const { value } = e.target;
		setterFunction(value);
	};

	const addNewKeyVal = () => {
		let newObj = {
			value: [formValue],
			key: formKey
		};
		let detData: any = localStorage.getItem('savedKeys');
		let existingData = detData?.length ? JSON.parse(detData) : [];
		let totalRecords = [...allLists, ...existingData, newObj];
		const ids = totalRecords.map((o) => o.key);
		const filtered = totalRecords.filter(
			({ key }, index) => !ids.includes(key, index + 1)
		);
		localStorage.setItem('savedKeys', JSON.stringify(filtered));
		setAllLists(filtered);
		setFormValue('');
		setFormKey('');
	};

	const updateExixtingStructure = (id: any, newValue: any) => {
		let existingRecords = [...allLists];
		existingRecords[id].value.push(newValue);
		localStorage.removeItem('savedKeys');
		const ids = existingRecords.map((o) => o.key);
		const filtered = existingRecords.filter(
			({ key }, index) => !ids.includes(key, index + 1)
		);
		localStorage.setItem('savedKeys', JSON.stringify(filtered));
		setAllLists(filtered);
	};

	const deleteExixtingKeyValuePair = (id: any) => {
		let existingRecords = [...allLists];
		localStorage.removeItem('savedKeys');
		const ids = existingRecords.filter((o, index) => index !== id);
		const filtered = ids.filter(
			({ key }, index) => !ids.includes(key, index + 1)
		);
		localStorage.setItem('savedKeys', JSON.stringify(filtered));
		setAllLists(filtered);
	};

	const removeSpecficValFromKey = (keyId: any, valId: any) => {
		let existingRecords: any = [...allLists];
		localStorage.removeItem('savedKeys');
		const values = existingRecords[keyId].value;
		const ids = values.filter((o: any, index: any) => index !== valId);
		existingRecords[keyId].value = ids;

		localStorage.setItem('savedKeys', JSON.stringify(existingRecords));
		setAllLists(existingRecords);
	};

	return (
		<div className='App'>
			<Forms
				addNewKeyVal={addNewKeyVal}
				onNewFormDetailsChange={onNewFormDetailsChange}
				formKey={formKey}
				formValue={formValue}
				setFormValue={setFormValue}
				setFormKey={setFormKey}
				setAllLists={setAllLists}
				setIsCoped={setIsCoped}
			/>
			<NewFormValue
				allLists={allLists}
				setAllLists={setAllLists}
				updateExixtingStructure={updateExixtingStructure}
				setIsCoped={setIsCoped}
				deleteExixtingKeyValuePair={deleteExixtingKeyValuePair}
				removeSpecficValFromKey={removeSpecficValFromKey}
			/>
			{isCopied.copied && (
				<div
					style={{
						position: 'fixed',
						top: '5px',
						left: '20%',
						background: '#000000cc',
						color: '#00ce12',
						borderRadius: '10px',
						padding: '0.8em 1.5em',
						fontWeight: 600,
						fontSize: '1em',
						width: 250
					}}
				>
					{isCopied.type}
				</div>
			)}
		</div>
	);
}

export default App;
