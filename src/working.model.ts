// src/working.model.ts

export class Working {
	id: number;
	title: string;
	description: string;
	link: string;
	status: WorkingStatus;
}

export enum WorkingStatus {
	HIDDEN = "hidden",
	VISIBLE = "visible",
}
