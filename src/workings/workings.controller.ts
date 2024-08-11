// src/workings/workings.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Working, WorkingStatus } from '../working.model';
import { WorkingsService } from './workings.service';

@Controller('workings')
export class WorkingsController {
	constructor(private workingsService: WorkingsService) {}

	@Post()
	createWorking(@Body() createWorkingDto: { 
			title: string; 
			description: string; 
			link: string, 
			status: WorkingStatus }): Working {
		return this.workingsService.createWorking(
			createWorkingDto.title, 
			createWorkingDto.description, 
			createWorkingDto.link, 
			createWorkingDto.status);
	}

	@Get()
	getAllWorkings(): Working[] {
		return this.workingsService.getAllWorkings();
	}

	@Get(':id')
	getWorkingById(@Param('id') id: string): Working {
		const parsedId = parseInt(id, 10);
		return this.workingsService.getWorkingById(parsedId);
	}

	@Put(':id')
	updateWorking(@Param('id') id: string, @Body() updateWorkingDto: {
			title: string; 
			description: string; 
			link: string; 
			status: WorkingStatus}): Working {
		const parsedId = parseInt(id);
		return this.workingsService.updateWorking(
			parsedId, 
			updateWorkingDto.title, 
			updateWorkingDto.description, 
			updateWorkingDto.link, 
			updateWorkingDto.status,
		);
}

	@Put(':id/status')
	updateWorkingStatus(@Param('id') id: string, @Body('status') status: WorkingStatus = WorkingStatus.VISIBLE): Working {
		const parsedId = parseInt(id, 10);
		return this.workingsService.updateWorkingStatus(parsedId, status);
	}

	@Delete(':id')
	deleteWorking(@Param('id') id: string): void {
		const parsedId = parseInt(id, 10);
		this.workingsService.deleteWorking(parsedId);
	}
}
