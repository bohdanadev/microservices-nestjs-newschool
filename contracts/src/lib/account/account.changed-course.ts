import { PurchaseState } from '@newschool/interfaces';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export namespace AccountChangedCourse {
  export const topic = 'account.changed-course.event';

  export class Request {
    @IsString()
    userId?: string | Types.ObjectId;

    @IsString()
    courseId?: string | Types.ObjectId;

    @IsString()
    state?: PurchaseState;
  }
}
