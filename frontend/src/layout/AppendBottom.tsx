import * as React from "react";

export const AppendBottom = (args: { children: any }) => (
	<div
		style={{
			marginBottom: "10px"
		}}
	>
		{args.children}
	</div>
);
