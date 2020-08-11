import { IDashboardDataContext, IOrganisation, IWorkSpace } from "../models";
import { type } from "os";

interface Action {
	type: "SET_ORGANISATION" | "SET_WORKSPACE";
	payload?: any;
}

/**
 * Handles user state
 * @param state
 * @param action
 */
const dashboardReducer = (state: IDashboardDataContext, action: Action) => {
	switch (action.type) {
		case "SET_ORGANISATION":
			return {
				...state,
				organisation: action.payload,
			};
		case "SET_WORKSPACE":
			return {
				...state,
				workspace: action.payload,
			};
	}
	return state;
};

export const setOrganisation = (data: IOrganisation): Action => {
	return {
		type: "SET_ORGANISATION",
		payload: data,
	};
};
export const setActiveWorkSpace = (data: IWorkSpace): Action => {
	return {
		type: "SET_WORKSPACE",
		payload: data,
	};
};

export default dashboardReducer;
