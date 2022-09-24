import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('/api/v1/jobs')
@UseGuards(new AuthGuard())
export class JobsController {
    constructor(private jobsService: JobsService) { }
    
    @Get()
    getAllJobs(@Session() session: Record<string, any>) {
        return this.jobsService.getAllJobs(session.userId)
    }

    @Post()
    createNewJob(@Body() body: CreateJobDto, @Session() session: Record<string, any>) {
        return this.jobsService.createNewJob(body, session.userId)
    }

    @Get('/:id')
    getSingleJob(@Param('id') jobId: string, @Session() session: Record<string, any>) {
        return this.jobsService.getSingleJob(jobId, session.userId)
    }

    @Delete('/:id')
    deleteJob(@Param('id') jobId: string, @Session() session: Record<string, any>) {
        return this.jobsService.deleteJob(jobId, session.userId)
    }

    @Patch('/:id')
    updateJob(
        @Param('id') jobId: string,
        @Body() updatedJobBody: UpdateJobDto,
        @Session() session: Record<string, any>
    ) { 
        return this.jobsService.updateJob(jobId, session.userId, updatedJobBody)
    }
}
