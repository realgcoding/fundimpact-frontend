import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Box, Divider, MenuItem } from "@material-ui/core";
import Project from "../../../Project/Project";
import { useQuery } from "@apollo/client";
import SimpleMenu from "../../../Menu/Menu";
import FIDialog from "../../../Dialog/Dialoag";
import { PROJECT_ACTIONS } from "../../../Project/constants";
import ProjectList from "../ProjectList/ProjectList";
import { GET_WORKSPACES_BY_ORG } from "../../../../graphql/queries/index";
import { useDashBoardData, useDashboardDispatch } from "../../../../contexts/dashboardContext";
import { setActiveWorkSpace } from "../../../../reducers/dashboardReducer";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		workspace: {
			"& :hover": {
				"& $workspaceEditIcon": {
					opacity: 1,
				},
			},
		},
		workspaceList: {
			display: "flex",
			flexDirection: "column",
			alignItems: "initial",
		},
		"& .workspaceList:hover .workspaceEditIcon": {
			opacity: 1,
		},
		workspaceEditIcon: {
			opacity: 0,
		},
		workspaceListText: {
			color: theme.palette.primary.main,
		},
	})
);

function AddProject({ workspace }: { workspace: any }) {
	const [open, setOpen] = React.useState(false);
	const handleModalOpen = () => {
		setOpen(true);
	};
	const handleModalClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<MenuItem onClick={handleModalOpen}>Add project</MenuItem>
			{open && (
				<FIDialog
					open={open}
					handleClose={() => handleModalClose()}
					header={"Create Project"}
					children={<Project type={PROJECT_ACTIONS.CREATE} workspace={workspace} />}
				/>
			)}
		</div>
	);
}

export default function WorkspaceList() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<any>([]);
	const dashboardData = useDashBoardData();
	const dispatch = useDashboardDispatch();
	const filter: any = { filter: dashboardData?.organisation };
	const { data, loading, error } = useQuery(GET_WORKSPACES_BY_ORG, filter);
	if (loading) return null;

	return (
		<List className={classes.workspace}>
			{data.orgWorkspaces.map((workspace: any, index: number) => {
				return (
					<ListItem key={index} className={classes.workspaceList}>
						<Box display="flex">
							<Box flexGrow={1}>
								<ListItemText
									primary={workspace.name}
									className={classes.workspaceListText}
								/>
							</Box>
							<Box>
								<IconButton
									onClick={() => {
										dispatch(setActiveWorkSpace(workspace));
									}}
									className={classes.workspaceEditIcon}
									aria-haspopup="true"
								>
									<EditOutlinedIcon fontSize="small" />
								</IconButton>
							</Box>
						</Box>
						<List>
							<ProjectList workspaceId={workspace.id} />
						</List>
						<Divider />
					</ListItem>
				);
			})}
		</List>
	);
}
