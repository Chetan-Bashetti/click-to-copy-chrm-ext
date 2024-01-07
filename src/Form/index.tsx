import React from 'react';
import { BG, BORDER_RADIUS } from '../utils';

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
		border: `1px solid ${BG}`,
		outline: 'none',
		fontFamily: 'inherit',
		borderRadius: BORDER_RADIUS
	},
	button: {
		flex: 1,
		padding: '0.5em',
		margin: '0.5em',
		width: '100%',
		border: 'none',
		color: 'white',
		fontFamily: 'inherit',
		borderRadius: BORDER_RADIUS
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
				flexDirection: 'column',
				padding: '0.4em',
				margin: '0.8em',
				boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
				marginBottom: '0',
				borderRadius: BORDER_RADIUS,
				background: 'white'
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
						textTransform: 'capitalize',
						fontWeight: 600,
						cursor:
							formKey.length && formValue.length ? 'pointer' : 'not-allowed',
						background: BG
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
						textTransform: 'capitalize',
						fontWeight: 600,
						cursor: 'pointer',
						background: BG
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
						textTransform: 'capitalize',
						fontWeight: 600,
						cursor: 'pointer',
						background: BG
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
						textTransform: 'capitalize',
						fontWeight: 600,
						cursor: 'pointer',
						background: BG
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
								color: 'black',
								border: `1px solid ${BG}`,
								fontFamily: 'inherit'
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
								textTransform: 'capitalize',
								fontWeight: 600,
								cursor: 'pointer',
								background: BG
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
