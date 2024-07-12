import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    @IsString()
    courseId?: string | Types.ObjectId;

    @IsString()
    userId?: string | Types.ObjectId;

    @IsNumber()
    sum?: number;
  }

  export class Response {
    paymentLink?: string;
  }
}
