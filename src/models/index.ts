import { IProject } from "./project/project";

export interface ISignUpStep {
	label: string;
	id: string;
	step: number;
	description?: string;
}

export interface IUserSignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface IOrganisation {
	orgName: string;
	name?: string;
	streetAdd: string;
	city: string;
	state: string;
	country: string;
	zipCode: number | null;
}

export interface IWorkSpace {
	id: string;
	name: string;
	organisation: {
		name: string;
		id: string;
	};
}

export interface IBasicInformation {
	email: string;
	password: string;
	confirmPassword: string;
	provider: "local";
	organisation: {
		name: string;
		short_name?: string;
		legal_name?: string;
		description?: string;
		type?: string;
	};
}

export interface IDashboardDataContext {
	project?: IProject;
	organisation?: IOrganisation;
	workspace?: any;
}

export interface ILoginForm {
	email: String;
	password: String;
}

export interface IAlertMsg {
	severity?: "success" | "info" | "warning" | "error";
	msg?: string;
}
