import { PurchaseState } from '@newschool/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import {
  BuyCourseSagaStateCanceled,
  BuyCourseSagaStatePurchased,
  BuyCourseSagaStateWaitingForPayment,
  BuyCourseSagaStateStarted,
} from './buy-course.steps';
import { BuyCourseSagaState } from './buy-course.state';
import { Types } from 'mongoose';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public user: UserEntity,
    public courseId: string | Types.ObjectId,
    public rmqService: RMQService
  ) {
    this.setState(user.getCourseState(courseId), courseId);
  }

  setState(state: PurchaseState, courseId: string | Types.ObjectId) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSagaStateWaitingForPayment();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStatePurchased();
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCanceled();
        break;
    }
    this.state.setContext(this);
    this.user.setCourseStatus(courseId, state);
  }

  getState() {
    return this.state;
  }
}
