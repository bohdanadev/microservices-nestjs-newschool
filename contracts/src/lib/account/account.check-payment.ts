import { IsString } from 'class-validator';
import { PaymentStatus } from '../payment/payment.check';
import { Types } from 'mongoose';

export namespace AccountCheckPayment {
  export const topic = 'account.check-payment.command';

  export class Request {
    @IsString()
    userId?: string | Types.ObjectId;

    @IsString()
    courseId?: string | Types.ObjectId;
  }

  export class Response {
    status?: PaymentStatus;
  }
}
