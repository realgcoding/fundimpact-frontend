import React from "react";
import { IImpactCategory } from "../../../models/impact/impact";
import { useMutation } from "@apollo/client";
import { CREATE_IMPACT_CATEGORY_ORG_INPUT } from "../../../graphql/queries/Impact/mutation";
import { useDashBoardData } from "../../../contexts/dashboardContext";
import {
	setErrorNotification,
	setSuccessNotification,
} from "../../../reducers/notificationReducer";
import { useNotificationDispatch } from "../../../contexts/notificationContext";
import dataInputFields from "../../../utils/inputFields.json";
import { IInputField } from "../../../models";
import CommonDialog from "../CommonDialog";

let inputFields: IInputField[] = dataInputFields.impactCategoryForm;

const initialValues: IImpactCategory = {
	name: "",
	description: "",
	code: "",
	shortname: "",
};

const validate = (values: IImpactCategory) => {
	let errors: Partial<IImpactCategory> = {};
	if (!values.name) {
		errors.name = "Name is required";
	}
	if (!values.description) {
		errors.description = "Description is required";
	}
	if (!values.code) {
		errors.code = "Impact Code is required";
	}
	if (!values.shortname) {
		errors.shortname = "Shortname is required";
	}
	return errors;
};

function ImpactCategoryDialog({ open, handleClose }: { open: boolean; handleClose: () => void }) {
	const [createImpactCategoryOrgInput, { loading }] = useMutation(
		CREATE_IMPACT_CATEGORY_ORG_INPUT
	);
	const dashboardData = useDashBoardData();
	const notificationDispatch = useNotificationDispatch();

	const onSubmit = async (values: IImpactCategory) => {
		try {
			await createImpactCategoryOrgInput({
				variables: {
					input: {
						...values,
						organization: dashboardData?.organization?.id,
					},
				},
			});
			notificationDispatch(setSuccessNotification("Impact Category Creation Success"));
			handleClose();
		} catch (err) {
			notificationDispatch(setErrorNotification("Impact Category Creation Failure"));
			handleClose();
		}
	};

	return (
		<CommonDialog
			handleClose={handleClose}
			open={open}
			initialValues={initialValues}
			inputFields={inputFields}
			loading={loading}
			onSubmit={onSubmit}
			validate={validate}
			title="New Impact Category"
			subtitle="Physical addresses of your organizatin like headquater, branch etc."
			workspace="WORKSPACE 1"
		/>
	);
}

export default ImpactCategoryDialog;