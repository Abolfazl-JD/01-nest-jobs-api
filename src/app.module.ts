import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest-jobs-api'), UsersModule, JobsModule],
})
export class AppModule {}
