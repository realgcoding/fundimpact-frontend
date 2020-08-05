import { WORKSPACE_ACTIONS } from "../../components/workspace/constants";

export interface IWorkspace {
	id?: number;
	name: string;
	short_name?: string;
	description?: string;
	organisation: number;
}

/**
 * @description Response that Apollo client will return and  store in its cache
 * when CREATE_WORKSPACE is executed.
 */
export interface IWorkspaceData {
	workspaces: IWorkspace[];
}

export type WorkspaceProps =
	| { type: WORKSPACE_ACTIONS.CREATE }
	| { type: WORKSPACE_ACTIONS.UPDATE; data: IWorkspace };
