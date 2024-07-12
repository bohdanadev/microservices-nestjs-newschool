import { ICourse } from '@newschool/interfaces';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    @IsString()
    id?: string | Types.ObjectId;
  }

  export class Response {
    course?: ICourse | null;
  }
}
