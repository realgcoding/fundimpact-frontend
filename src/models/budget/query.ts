import { IOrganizationCurrency } from "../index";
import { IProject } from "../project/project";
import { IBudget } from "../budget/budget";

export interface IBudgetTargetProjectResponse {
	id: string;
	name: string;
	total_target_amount: string;
	conversion_factor: string;
	organization_currency: IOrganizationCurrency;
	project: Partial<IProject>;
	description: string;
	budget_category_organization: Partial<IBudget>;
}

export interface IGET_BUDGET_TARGET_PROJECT {
	budgetTargetsProjects: IBudgetTargetProjectResponse[];
}

export interface IGET_BUDGET_CATEGORY {
	orgBudgetCategory: Partial<IBudget>[];
}