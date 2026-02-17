// Selectors - functions to read data from state
export const selectAllTables = (state) => state.tables;
export const selectTableById = (id) => (state) =>
	state.tables.find((table) => table.id === id);

// Action types
const createActionName = (actionName) => `app/tables/${actionName}`;
const LOAD_TABLES_REQUEST = createActionName('LOAD_TABLES_REQUEST');
const LOAD_TABLES_SUCCESS = createActionName('LOAD_TABLES_SUCCESS');
const LOAD_TABLES_ERROR = createActionName('LOAD_TABLES_ERROR');
const UPDATE_TABLE_REQUEST = createActionName('UPDATE_TABLE_REQUEST');
const UPDATE_TABLE_SUCCESS = createActionName('UPDATE_TABLE_SUCCESS');
const UPDATE_TABLE_ERROR = createActionName('UPDATE_TABLE_ERROR');

// Action creators
export const loadTablesRequest = () => ({ type: LOAD_TABLES_REQUEST });
export const loadTablesSuccess = (payload) => ({
	type: LOAD_TABLES_SUCCESS,
	payload,
});
export const loadTablesError = () => ({ type: LOAD_TABLES_ERROR });
export const updateTableRequest = () => ({ type: UPDATE_TABLE_REQUEST });
export const updateTableSuccess = (payload) => ({
	type: UPDATE_TABLE_SUCCESS,
	payload,
});
export const updateTableError = () => ({ type: UPDATE_TABLE_ERROR });

// Thunk - async action to fetch tables from API
export const fetchTables = () => {
	return (dispatch) => {
		dispatch(loadTablesRequest());

		fetch('http://localhost:3131/api/tables')
			.then((response) => response.json())
			.then((data) => dispatch(loadTablesSuccess(data)))
			.catch(() => dispatch(loadTablesError()));
	};
};
// Thunk - async action to update table on server
export const updateTable = (updatedTable) => {
	return (dispatch) => {
		dispatch(updateTableRequest());

		fetch(`http://localhost:3131/api/tables/${updatedTable.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedTable),
		})
			.then((response) => response.json())
			.then((data) => dispatch(updateTableSuccess(data)))
			.catch(() => dispatch(updateTableError()));
	};
};

// Reducer
const tablesReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_TABLES_SUCCESS:
			return action.payload;
		case UPDATE_TABLE_SUCCESS:
			return statePart.map((table) =>
				table.id === action.payload.id ? action.payload : table,
			);
		default:
			return statePart;
	}
};

export default tablesReducer;
