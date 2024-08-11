// src/workings/workings.service.ts

import { Injectable } from '@nestjs/common';
import { Working, WorkingStatus } from '../working.model';

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
		};
		this.workings.push(working);
		return working;
	}

	getAllWorkings(): Working[] {
		return this.workings;
	}

	getWorkingById(id: number): Working {
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
			status
		};
		console.log(`id: ${id}, title: ${title}, desc: ${description}, link: ${link}, status: ${status}`);

		const working = this.getWorkingById(id);
		if (working) {
			working.title = newWorking.title;
			working.description = newWorking.description;
			working.link = newWorking.link;
			working.status = newWorking.status; 
		}
		return newWorking;
	}

	deleteWorking(id: number): void {
		this.workings = this.workings.filter((task) => task.id !== id);
	}
}
