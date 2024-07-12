import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export type PaymentStatus = 'canceled' | 'success' | 'progress';

export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsString()
    courseId?: string | Types.ObjectId;

    @IsString()
    userId?: string | Types.ObjectId;
  }

  export class Response {
    status?: PaymentStatus;
  }
}
