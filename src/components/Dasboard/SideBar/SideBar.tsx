import React from "react";
import {
	Box,
	Typography,
	Divider,
	List,
	CircularProgress,
	MenuItem,
	Menu,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useQuery } from "@apollo/client";
import { GET_ORGANISATIONS } from "../../../graphql/queries";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import IconButton from "@material-ui/core/IconButton";
import WorkspaceList from "./WorkspaceList/WorkspaceList";
import SimpleMenu from "../../Menu/Menu";
import {
	useDashboard,
	useDashBoardData,
	useDashboardDispatch,
} from "../../../contexts/dashboardContext";
import { setOrganisation } from "../../../reducers/dashboardReducer";

export default function SideBar({ children }: { children?: Function }) {
	const classes = useStyles();

	const { loading, error, data } = useQuery(GET_ORGANISATIONS);
	const dispatch = useDashboardDispatch();
	const dashboardData = useDashBoardData();

	React.useEffect(() => {
		if (data) {
			const { organisationList } = data;
			if (organisationList) {
				dispatch(setOrganisation(organisationList[0]));
			}
		}
	}, [data]);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const menuList = [
		{ children: <MenuItem>Edit Organisation</MenuItem> },
		{ children: <MenuItem>Add Workspace</MenuItem> },
	];

	if (!dashboardData) {
		return (
			<Box className={classes.sidePanelLoader} mr={1} p={0} boxShadow={1}>
				<CircularProgress />
			</Box>
		);
	} else
		return (
			<Box className={classes.sidePanel} mr={1} p={0} boxShadow={1}>
				<>
					<Box display="flex" m={2}>
						<Box flexGrow={1} ml={1}>
							<Typography color="primary" gutterBottom variant="h6">
								{dashboardData?.organisation?.name}
							</Typography>
						</Box>
						<Box>
							<IconButton
								edge="end"
								aria-label="edit"
								aria-controls={`organisationMenu`}
								aria-haspopup="true"
								onClick={handleClick}
							>
								<MoreVertOutlinedIcon />
							</IconButton>
							<SimpleMenu
								handleClose={handleClose}
								id={`organisationMenu`}
								anchorEl={anchorEl}
								menuList={menuList}
							/>
						</Box>
					</Box>
					<Divider />
					<WorkspaceList />
				</>
			</Box>
		);
}
