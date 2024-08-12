// src/working.model.ts

export class Working {
	id: number;
	title: string;
	description: string;
	link: string;
	status: WorkingStatus;
	image?: StoredFile
}

export enum WorkingStatus {
	HIDDEN = "hidden",
	VISIBLE = "visible",
}

export class StoredFile {
	filename: string;
	data: Buffer;
	mimetype: string;
}
