import React from "react";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import { Grid, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CommonInputForm from "../../Forms/CommonInputForm";
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
import DialogBoxSidebar from "../../DialogBoxSidebar";

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
		<Dialog
			fullWidth
			maxWidth="md"
			open={open}
			onClose={handleClose}
			data-testid="impact-category-dialog"
			aria-labelledby="form-dialog-title"
		>
			<Box px={3} py={4}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<DialogBoxSidebar
							title="New Impact Category"
							subtitle="Physical addresses of your organizatin like headquater, branch etc."
							workspace="WORKSPACE 1"
						/>
					</Grid>
					<Grid item xs={8}>
						<CommonInputForm
							initialValues={initialValues}
							validate={validate}
							onSubmit={onSubmit}
							onCancel={() => handleClose()}
							inputFields={inputFields}
						/>
					</Grid>
				</Grid>
			</Box>
			{loading ? (
				<Box position="fixed" bottom={0} alignSelf="center">
					<CircularProgress />
				</Box>
			) : null}
		</Dialog>
	);
}

export default ImpactCategoryDialog;
