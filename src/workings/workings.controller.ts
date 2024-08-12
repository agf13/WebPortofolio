// src/workings/workings.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Working, WorkingStatus, StoredFile } from '../working.model';
import { WorkingsService } from './workings.service';

@Controller('workings')
export class WorkingsController {
	constructor(private workingsService: WorkingsService) {}

	@Post()
	createWorking(@Body() createWorkingDto: { 
			title: string; 
			description: string; 
			link: string;
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
			status: WorkingStatus }): Working {
		const parsedId = parseInt(id);
		return this.workingsService.updateWorking(
			parsedId, 
			updateWorkingDto.title, 
			updateWorkingDto.description, 
			updateWorkingDto.link, 
			updateWorkingDto.status,
		);
	}

	/*
	@Post(':id/image')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-'
					const ext = extname(file.originalname);
					cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
					return cb(new Error('Only image files are allowed!'), false);
				}
				cb(null, true);
			},
		}),
	)
	addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
		console.log(file);
		const parsedId = parseInt(id);
		const filePath = file.path;
		return this.workingsService.addImage(parsedId, filePath);
	}
	*/
	@Post(':id/image')
	@UseInterceptors(FileInterceptor('image'))
	addImage(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
		const parsedId = parseInt(id);
		const storedImage: StoredFile = {
			filename: image.originalname,
			data: image.buffer,
			mimetype: image.mimetype,
		}
		console.log(`filename: ${storedImage.filename}, mimetype: ${storedImage.mimetype}`);
		console.log(`Do we have an id: ${id} or a parsedId: ${parsedId}`)
		return this.workingsService.addImage(parsedId, storedImage);
	}

	@Get(':id/image')
	getImage(@Param('id') id: string, @Res() res: Response) {
		const parsedId = parseInt(id);
		const storedImage = this.workingsService.getImage(parsedId);
		
		if(!storedImage) {
			return res.status(404).send('File not found.');
		}

		res.setHeader('Content-Type', storedImage.mimetype);
		return res.send(storedImage.data);
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
