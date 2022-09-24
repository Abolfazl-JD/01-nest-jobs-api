import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { Job, JobDocument } from './job.schema';

@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private JobModel: Model<JobDocument>) { }

    async getAllJobs(userId: string) {
        const jobs = await this.JobModel.find({ createdBy: userId }).sort('createdAt')
        return { count: jobs.length, jobs }
    }

    async createNewJob(jobInfo: CreateJobDto, userId: string) {
        const job = await this.JobModel.create({ ...jobInfo, createdBy: userId })
        return job
    }

    async getSingleJob(jobId: string, userId: string) {
        const job = await this.JobModel.findOne({ _id: jobId, createdBy: userId })
        
        if (!job) throw new NotFoundException('the job you are looking for was not found')
        return job
    }

    async deleteJob(jobId: string, userId: string) {
        const job = await this.JobModel.findOneAndDelete({ _id: jobId, createdBy: userId })

        if (!job) throw new NotFoundException('the job you are looking for was not found')
        return 'the job has been successfully deleted'
    }

    async updateJob(jobId: string, userId: string, jobBody: UpdateJobDto) {
        const updatedJob = await this.JobModel.findOneAndUpdate(
            { _id: jobId, createdBy: userId },
            jobBody,
            { new: true, runValidators: true }
        )

        if (!updatedJob) throw new NotFoundException('the job you are looking for was not found')
        return updatedJob
    }
}
