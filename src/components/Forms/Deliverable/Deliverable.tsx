import {
	Box,
	Button,
	createStyles,
	Dialog,
	DialogContent,
	makeStyles,
	TextField,
	Theme,
	Grid,
	Typography,
	Card,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { IDeliverableFormProps } from "../../../models/deliverable/deliverableForm";
import { DELIVERABLE_ACTIONS } from "../../Deliverable/constants";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			"& .MuiTextField-root,": {
				margin: theme.spacing(1),
			},
			"& .MuiButtonBase-root": {
				marginTop: theme.spacing(4),
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
		},
		button: {
			color: theme.palette.common.white,
			margin: theme.spacing(1),
		},
		leftBox: {
			width: "100%",
			backgroundColor: "#e3f2fd",
			height: "40%",
			marginTop: theme.spacing(1),
		},
	})
);

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DeliverableForm({
	clearErrors,
	initialValues,
	validate,
	formState,
	onCreate,
	onUpdate,
	children,
	formIsOpen,
	handleFormOpen,
}: IDeliverableFormProps & React.PropsWithChildren<IDeliverableFormProps>) {
	const classes = useStyles();

	return (
		<Dialog
			fullWidth
			open={formIsOpen}
			aria-labelledby="form-dialog-title"
			maxWidth="md"
			TransitionComponent={Transition}
		>
			<DialogContent>
				<Box
					mx="auto"
					height={"100%"}
					width={{ xs: "100%", md: "100%", lg: "100%" }}
					onChange={clearErrors}
				>
					<Grid container justify={"center"}>
						<Grid item xs={4}>
							<Typography variant="h6" gutterBottom>
								New Deliverables
							</Typography>
							<Typography variant="subtitle2" gutterBottom color="textSecondary">
								Physical addresses of your organisation like headquarter branch etc
							</Typography>
							<Card elevation={0} className={classes.leftBox}>
								<Box mt={2} ml={3}>
									<Typography variant="subtitle1" gutterBottom color="primary">
										WORKSPACE 1
									</Typography>
								</Box>
								<Box m={1} ml={3}>
									<Typography variant="body2" gutterBottom color="textPrimary">
										PROJECT 1
									</Typography>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={8}>
							<Formik
								validateOnBlur
								validateOnChange
								initialValues={initialValues}
								enableReinitialize={true}
								validate={validate}
								onSubmit={(values) =>
									formState === DELIVERABLE_ACTIONS.CREATE
										? onCreate(values)
										: onUpdate(values)
								}
							>
								{(formik) => {
									return (
										<Form
											id="deliverable_form"
											className={classes.root}
											autoComplete="off"
										>
											<TextField
												data-testid="name"
												value={formik.values.name}
												error={!!formik.errors.name}
												helperText={
													formik.touched.name && formik.errors.name
												}
												onChange={formik.handleChange}
												label="Name"
												required
												name="name"
												variant="outlined"
												fullWidth
											/>

											<TextField
												data-testid="short_name"
												value={formik.values.code}
												error={!!formik.errors.code}
												onChange={formik.handleChange}
												label="Deliverable Code"
												required
												name="code"
												type="text"
												variant="outlined"
												fullWidth
											/>
											<TextField
												data-testid="description"
												value={formik.values.description}
												error={!!formik.errors.description}
												onChange={formik.handleChange}
												label="Description"
												multiline
												rows={3}
												name="description"
												type="text"
												variant="outlined"
												fullWidth
											/>
										</Form>
									);
								}}
							</Formik>
							<Box display="flex" m={1}>
								<Button
									color="secondary"
									className={classes.button}
									onClick={handleFormOpen}
									variant="contained"
								>
									Cancel
								</Button>
								<Button
									className={classes.button}
									data-testid="submit"
									form="deliverable_form"
									type="submit"
									color="primary"
									variant="contained"
								>
									{formState === DELIVERABLE_ACTIONS.CREATE ? "Create" : "Update"}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			{children ? children : null}
		</Dialog>
	);
}

export default DeliverableForm;