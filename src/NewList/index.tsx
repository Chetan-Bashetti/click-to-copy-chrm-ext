import React from 'react';

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
		border: '1px solid #7a43f5'
	},
	button: {
		padding: '0.3em 0.5em',
		margin: '0.5em',
		border: 'none',
		color: 'white',
		background: '#7a43f5',
		cursor: 'pointer',
		borderRadius: '50%'
	},
	overlap: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		padding: '0.4em'
	},
	newVal: {
		padding: '0.8em',
		border: '1px solid #7a43f5',
		margin: '0 0.5em',
		display: 'flex'
	},
	addNewTextBox: {
		padding: '0.8em',
		border: '1px solid #7a43f5',
		margin: '0px 0.5em 0 0',
		width: '-webkit-fill-available'
	},
	addNewBtn: {
		border: 'none',
		color: 'white',
		cursor: 'pointer',
		background: '#7a43f5'
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
				display: 'flex'
			}}
		>
			{details?.length ? (
				<div style={{ ...styles.borders, borderBottom: 'none', flex: 1 }}>
					<div
						style={{
							...styles.flex,
							...styles.padding,
							flexDirection: 'row',
							borderBottom: '1px solid #7a43f5',
							alignItems: 'center'
						}}
					>
						<div style={{ fontWeight: 800, width: 100, padding: '0.4em' }}>
							Keys
						</div>{' '}
						&#x2194;
						<div style={{ ...styles.fullWidth, fontWeight: 800, flex: 1 }}>
							Values
						</div>
					</div>
					<div
						style={{
							overflowY: 'scroll',
							flex: 1
						}}
					>
						{details?.map((eachKey: any, index) => (
							<div
								key={index}
								style={{
									...styles.flex,
									...styles.fullWidth,
									...styles.padding,
									flex: 1,
									flexDirection: 'column',
									borderBottom: '1px solid #7a43f5'
								}}
							>
								<div
									style={{
										...styles.flex,
										...styles.fullWidth,
										...styles.padding,
										flex: 1,
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<div
										style={{
											...styles.overlap,
											fontFamily: 'monospace',
											width: 100,
											fontSize: '20px'
										}}
									>
										{eachKey.key}
									</div>
									&#x2192;
									<div
										style={{
											...styles.fullWidth,
											fontFamily: 'monospace',
											display: 'flex',
											alignItems: 'center',
											flexWrap: 'wrap'
										}}
									>
										{eachKey.value.map((eachValue: any, ind: number) => (
											<div
												style={{
													border: '1px solid #7a43f5',
													margin: '0.2em 0.2em',
													cursor: 'pointer',
													borderRadius: '5px',
													fontSize: '20px',
													display: 'flex'
												}}
												key={ind}
											>
												<div
													style={{
														padding: '0.3em'
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
															background: '#7a43f5',
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
											placeholder='Add new values'
											style={styles.addNewTextBox}
											value={newValue}
											onChange={(e) => {
												setNewValue(e.target.value);
											}}
										/>
										<button
											style={{
												...styles.addNewBtn,
												textTransform: 'uppercase',
												fontWeight: 600
											}}
											onClick={() => {
												updateExixtingStructure(index, newValue);
												setAddNew(false);
											}}
										>
											Add
										</button>
									</div>
								)}
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
