import React from "react";
import { ListItem, ListItemText, List } from "@material-ui/core";
import { GET_PROJECTS_BY_WORKSPACE } from "../../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@material-ui/lab";

export default function ProjectList({ workspaceId }: { workspaceId: any }) {
	const filter: any = { variables: { filter: { workspace: workspaceId } } };
	const { data, loading, error } = useQuery(GET_PROJECTS_BY_WORKSPACE, filter);

	if (loading)
		return (
			<ListItem>
				<Skeleton variant={"text"} />;
			</ListItem>
		);

	return (
		<List>
			{data.orgProject.map((project: any, index: number) => (
				<ListItem key={index} button>
					<ListItemText primary={project.name} />
				</ListItem>
			))}
		</List>
	);
}
