import React from "react";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import { Grid, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useMutation } from "@apollo/client";
import { IImpactUnitFormInput } from "../../../models/impact/impactForm";
import CommonInputForm from "../../Forms/CommonInputForm";
import { CREATE_IMPACT_UNITS_ORG_INPUT } from "../../../graphql/queries/Impact/mutation";
import { useNotificationDispatch } from "../../../contexts/notificationContext";
import {
	setErrorNotification,
	setSuccessNotification,
} from "../../../reducers/notificationReducer";
import dataInputFields from "../../../utils/inputFields.json";
import { IInputField } from "../../../models";
import DialogBoxSidebar from "../../DialogBoxSidebar";

let inputFields: IInputField[] = dataInputFields.impactUnitForm;

const initialValues: IImpactUnitFormInput = {
	name: "",
	description: "",
	code: "",
	target_unit: "",
	prefix_label: "",
	suffix_label: "",
};

const validate = (values: IImpactUnitFormInput) => {
	let errors: Partial<IImpactUnitFormInput> = {};
	if (!values.name) {
		errors.name = "Name is required";
	}
	if (!values.description) {
		errors.description = "Description is required";
	}
	if (!values.code) {
		errors.code = "Impact Code is required";
	}
	if (!values.target_unit) {
		errors.target_unit = "Target unit is required";
	}
	if (!values.prefix_label) {
		errors.prefix_label = "Prefix label is required";
	}
	if (!values.suffix_label) {
		errors.suffix_label = "Suffix label is required";
	}
	return errors;
};

function ImpactUnitDialog({ open, handleClose }: { open: boolean; handleClose: () => void }) {
	const [createImpactUnitsOrgInput, { loading }] = useMutation(CREATE_IMPACT_UNITS_ORG_INPUT);
	const notificationDispatch = useNotificationDispatch();

	const onSubmit = async (values: IImpactUnitFormInput) => {
		try {
			createImpactUnitsOrgInput({
				variables: {
					input: {
						...values,
					},
				},
			});
			notificationDispatch(setSuccessNotification("Impact Unit Creation Success"));
			handleClose();
		} catch (err) {
			notificationDispatch(setErrorNotification("Impact Unit Creation Failure"));
			handleClose();
		}
	};

	return (
		<Dialog
			fullWidth
			maxWidth="md"
			open={open}
			onClose={handleClose}
			data-testid="impact-unit-dialog"
			aria-labelledby="form-dialog-title"
		>
			<Box px={3} py={4}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<DialogBoxSidebar
							title="New Impact Unit"
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

export default ImpactUnitDialog;
