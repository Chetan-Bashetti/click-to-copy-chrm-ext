import React from 'react';
import { BG, BORDER_RADIUS, SEC_BG } from '../utils';

interface FormDetailsProps {
	allLists: object[];
	updateExixtingStructure: any;
	setAllLists: any;
	setIsCoped: any;
	deleteExixtingKeyValuePair: any;
	removeSpecficValFromKey: any;
}

const styles = {
	flex: {
		display: 'flex'
	},
	fullWidth: {
		flex: 1
	},
	padding: {
		padding: '0.5em 0'
	},
	borders: {
		border: `1px solid ${BG}`
	},
	button: {
		padding: '0.3em 0.5em',
		margin: '0 0.3em',
		border: 'none',
		color: 'white',
		background: SEC_BG,
		cursor: 'pointer',
		borderRadius: BORDER_RADIUS
	},
	overlap: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		padding: '0.4em'
	},
	newVal: {
		padding: '0.8em',
		display: 'flex'
	},
	addNewTextBox: {
		padding: '0.5em',
		margin: '0px 0.5em 0 0',
		width: '-webkit-fill-available',
		border: `1px solid ${BG}`
	},
	addNewBtn: {
		border: 'none',
		color: 'white',
		cursor: 'pointer',
		background: BG,
		borderRadius: BORDER_RADIUS,
		minWidth: 40
	}
};

const FormDetails: React.FC<FormDetailsProps> = ({
	allLists,
	updateExixtingStructure,
	setAllLists,
	setIsCoped,
	deleteExixtingKeyValuePair,
	removeSpecficValFromKey
}) => {
	const [details, setDetails] = React.useState([]);
	// const [isCopied, setIsCoped] = React.useState(false);
	const [addNew, setAddNew] = React.useState(false);
	const [selectedId, setSelectedId] = React.useState(0);
	const [newValue, setNewValue] = React.useState('');
	React.useEffect(() => {
		let detData: any = localStorage.getItem('savedKeys');
		setDetails(JSON.parse(detData));
	}, [allLists]);

	React.useEffect(() => {
		let detData: any = localStorage.getItem('savedKeys');
		setAllLists(JSON.parse(detData));
	}, []);

	// React.useEffect(() => {
	// 	let timeOut = setTimeout(() => {
	// 		setIsCoped(false);
	// 	}, 3000);
	// 	return () => {
	// 		clearTimeout(timeOut);
	// 	};
	// }, [isCopied]);

	return (
		<div
			style={{
				margin: '0.5em',
				display: 'flex',
				overflow: 'scroll'
			}}
		>
			{details?.length ? (
				<div style={{ flex: 1 }}>
					<div
						style={{
							overflowY: 'scroll',
							flex: 1
						}}
					>
						{details
							?.sort((a: any, b: any) => (b.date > a.date ? 1 : -1))
							?.map((eachKey: any, index) => (
								<div
									key={index}
									style={{
										...styles.flex,
										...styles.fullWidth,
										flexDirection: 'column',
										margin: '0.4em',
										boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
										background: 'white',
										borderRadius: BORDER_RADIUS
									}}
								>
									<div
										style={{
											...styles.flex,
											...styles.fullWidth,
											flex: 1,
											flexDirection: 'column'
										}}
									>
										<div
											style={{
												...styles.flex,
												...styles.overlap,
												fontSize: '14px',
												alignItems: 'flex-end',
												justifyContent: 'space-between'
											}}
										>
											<div
												style={{
													color: 'rgb(39 29 26)',
													fontWeight: 700,
													textTransform: 'capitalize',
													paddingLeft: '0.5em'
												}}
											>
												{eachKey.key}
											</div>
											<div>
												<button
													style={styles.button}
													onClick={() => {
														setSelectedId(index);
														setAddNew(!addNew);
														setNewValue('');
													}}
												>
													{selectedId === index && addNew ? (
														<span>&#10006;</span>
													) : (
														<span>&#x271A;</span>
													)}
												</button>
												<button
													style={styles.button}
													onClick={() => {
														deleteExixtingKeyValuePair(index);
													}}
												>
													&#x2716;
												</button>
											</div>
										</div>
										{selectedId === index && addNew && (
											<div style={styles.newVal}>
												<input
													placeholder='Add new value'
													style={styles.addNewTextBox}
													value={newValue}
													onChange={(e) => {
														setNewValue(e.target.value);
													}}
												/>
												<button
													style={{
														...styles.addNewBtn,
														textTransform: 'capitalize',
														fontWeight: 600
													}}
													onClick={() => {
														updateExixtingStructure(index, newValue);
														setAddNew(false);
													}}
												>
													&#x271A;
												</button>
											</div>
										)}
										<div
											style={{
												...styles.fullWidth,
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												background: '#eef2f5',
												margin: '0.8em',
												padding: '0.8em',
												borderRadius: '10px'
											}}
										>
											{eachKey.value.map((eachValue: any, ind: number) => (
												<div
													style={{
														border: `1px solid ${BG}`,
														margin: '0.3em',
														cursor: 'pointer',
														borderRadius: BORDER_RADIUS,
														fontSize: '14px',
														display: 'flex',
														background: 'white'
													}}
													key={ind}
												>
													<div
														style={{
															padding: '0.3em 0.6em'
														}}
														onClick={() => {
															navigator.clipboard.writeText(eachValue);
															setIsCoped({
																type: 'Text content copied now click CTRL+P to paste',
																copied: true
															});
														}}
													>
														{eachValue}
													</div>
													{eachKey.value.length > 1 && (
														<div
															style={{
																background: BG,
																padding: '0.2em',
																color: 'white',
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center'
															}}
														>
															<span
																style={{
																	display: 'flex',
																	justifyContent: 'center',
																	alignItems: 'center',
																	marginLeft: '0.2em'
																}}
																onClick={() => {
																	removeSpecficValFromKey(index, ind);
																}}
															>
																&#x2716;
															</span>
														</div>
													)}
												</div>
											))}
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			) : (
				<div style={{ fontWeight: 700 }}>
					No saved form values, Add new key values to use them
				</div>
			)}
		</div>
	);
};

export default FormDetails;
