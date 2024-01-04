import React from 'react';

interface FormsProps {
	addNewKeyVal: any;
	onNewFormDetailsChange: any;
	setFormValue: any;
	setFormKey: any;
	formKey: any;
	formValue: any;
	setAllLists: any;
	setIsCoped: any;
}

const styles = {
	flex: {
		display: 'flex'
	},
	components: {
		flex: 1,
		padding: '0.5em',
		margin: '0.5em',
		border: '1px solid #7a43f5',
		outline: 'none'
	},
	button: {
		flex: 1,
		padding: '0.5em',
		margin: '0.5em',
		width: '100%',
		border: 'none',
		color: 'white'
	}
};

const Forms: React.FC<FormsProps> = ({
	addNewKeyVal,
	onNewFormDetailsChange,
	setFormValue,
	setFormKey,
	formKey,
	formValue,
	setAllLists,
	setIsCoped
}) => {
	const [importData, setImportData] = React.useState('');
	const [isImporting, setIsImporting] = React.useState(false);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div style={styles.flex}>
				<input
					value={formKey}
					placeholder='Form Key'
					onChange={(e) => {
						onNewFormDetailsChange(e, setFormKey);
					}}
					style={styles.components}
				/>
				<input
					value={formValue}
					placeholder='Form Value'
					onChange={(e) => {
						onNewFormDetailsChange(e, setFormValue);
					}}
					style={styles.components}
				/>
			</div>
			<div style={styles.flex}>
				<button
					disabled={!formKey.length || !formValue.length}
					style={{
						...styles.button,
						textTransform: 'uppercase',
						fontWeight: 600,
						cursor:
							formKey.length && formValue.length ? 'pointer' : 'not-allowed',
						background: '#7a43f5'
					}}
					onClick={() => addNewKeyVal()}
				>
					Add
				</button>
			</div>
			<div style={styles.flex}>
				<button
					style={{
						...styles.button,
						textTransform: 'uppercase',
						fontWeight: 600,
						cursor: 'pointer',
						background: '#7a43f5'
					}}
					onClick={() => {
						setIsImporting(true);
					}}
				>
					Import
				</button>
				<button
					style={{
						...styles.button,
						textTransform: 'uppercase',
						fontWeight: 600,
						cursor: 'pointer',
						background: '#7a43f5'
					}}
					onClick={() => {
						let exportedData: any = localStorage.getItem('savedKeys');
						navigator.clipboard.writeText(exportedData);
						setIsCoped({
							type: 'Data export copied now click CTRL+P in textarea and confirm import button',
							copied: true
						});
					}}
				>
					Export
				</button>
				<button
					style={{
						...styles.button,
						textTransform: 'uppercase',
						fontWeight: 600,
						cursor: 'pointer',
						background: '#7a43f5'
					}}
					onClick={() => {
						localStorage.removeItem('savedKeys');
						setAllLists([]);
					}}
				>
					Clear
				</button>
			</div>
			{isImporting && (
				<div>
					<div>
						<textarea
							style={{
								...styles.flex,
								margin: '0.5em',
								width: '-webkit-fill-available',
								color: 'black'
							}}
							value={importData}
							onChange={(e) => setImportData(e.target.value)}
							placeholder='Paste the selecetd data and click on confirm import'
						/>
					</div>
					<div style={styles.flex}>
						<button
							style={{
								...styles.button,
								textTransform: 'uppercase',
								fontWeight: 600,
								cursor: 'pointer',
								background: '#7a43f5'
							}}
							onClick={() => {
								localStorage.setItem('savedKeys', importData);
								setAllLists(JSON.parse(importData));
								setImportData('');
								setIsImporting(false);
							}}
						>
							Confirm Import
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Forms;
