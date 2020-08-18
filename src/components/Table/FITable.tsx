import { IconButton, Menu, MenuItem, Table } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const StyledTableHeader = makeStyles((theme: Theme) =>
	createStyles({
		th: { color: theme.palette.primary.main },
		tbody: {
			"& tr:nth-child(even) td": { background: "#F5F6FA" },
			"& td.MuiTableCell-root": {
				paddingTop: "1px",
				paddingBottom: "1px",
			},
		},
	})
);

export default function FITable({
	tableHeading,
	rows,
}: {
	tableHeading: { label: string }[];
	rows: any[];
}) {
	const classes = useStyles();
	const tableHeader = StyledTableHeader();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow color="primary">
						{tableHeading.map((heading) => (
							<TableCell className={tableHeader.th} key={heading.label} align="left">
								{heading.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody className={tableHeader.tbody}>
					{rows.map((row: any, index: number) => (
						<TableRow key={index}>
							<TableCell component="td" scope="row">
								{index + 1}
							</TableCell>
							{row.map((col: string) => {
								return <TableCell align="left">{col}</TableCell>;
							})}
							<TableCell>
								<IconButton aria-label="delete">
									<MoreVertIcon fontSize="small" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}