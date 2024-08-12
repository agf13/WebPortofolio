// src/workings/workings.service.ts

import { Injectable } from '@nestjs/common';
import { Working, WorkingStatus, StoredFile } from '../working.model';

@Injectable()
export class WorkingsService {
	private workings: Working[] = [];

	createWorking(
			title: string, 
			description: string, 
			link: string = "not provided", 
			status: WorkingStatus): Working {
		console.log(`logging status: ${status}`)
		const id = this.workings.length + 1;
		const working: Working = {
			id,
			title,
			description,
			link,
			status,
			image: null,
		};
		this.workings.push(working);
		return working;
	}

	getAllWorkings(): Working[] {
		console.log("Get all workings called");
		return this.workings;
	}

	getWorkingById(id: number): Working {
		console.log(`Find working with this id: ${id}`);
		return this.workings.find((working) => working.id === id);
	}

	updateWorkingStatus(id: number, status: WorkingStatus = WorkingStatus.VISIBLE): Working {
		const working = this.getWorkingById(id)
		if(working) {
			working.status = status
		}
		return working;
	}

	updateWorking(
			id: number, 
			title: string, 
			description: string, 
			link: string, 
			status: WorkingStatus): Working {
        // check if status has a correct value. Otherwise use VISIBLE as default
        if(status != WorkingStatus.VISIBLE && status != WorkingStatus.HIDDEN) {
            console.log(`Wrong status: ${status}`);
            status = WorkingStatus.VISIBLE;
        } 

		const newWorking: Working = {
			id,
			title,
			description,
			link,
			status,
		};
		const working = this.getWorkingById(id);
		if (working) {
			working.title = newWorking.title;
			working.description = newWorking.description;
			working.link = newWorking.link;
			working.status = newWorking.status;
		}

		console.log(`
			id: ${id}, 
			title: ${title}, 
			desc: ${description}, 
			link: ${link}, 
			status: ${status}
			image: ${working.image}`);

		return newWorking;
	}

	deleteWorking(id: number): void {
		this.workings = this.workings.filter((task) => task.id !== id);
	}

	addImage(id: number, image: StoredFile) {
		const working = this.getWorkingById(id);

		console.log(`Image buffer is\n${image}`);
		console.log(`The working is: ${working}`)

		if(working) {
			console.log(`Any working found: ${working}`);
			working.image = image;
			console.log("Working found");
		}
		console.log("After assignment")
		console.log(`The working current image is: ${working.image}`);

		return working;
	}

	getImage(id: number): StoredFile {
		const working = this.getWorkingById(id);
		if(working) {
			return working.image;
		}

		return null;
	}
}
