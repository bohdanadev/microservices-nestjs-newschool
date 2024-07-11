import { RMQService } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { IUser } from '@newschool/interfaces';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
    private readonly userEventEmmiter: UserEventEmiiter
  ) {}

  public async changeProfile(user: Pick<IUser, 'displayName'>, id: string) {
    const existedUser = await this.userRepository.findUserById(id);
    if (!existedUser) {
      throw new Error('Такого пользователя не существует');
    }
    const userEntity = new UserEntity(existedUser).updateProfile(
      user.displayName
    );
    await this.updateUser(userEntity);
    return {};
  }

  public async buyCourse(userId: string, courseId: string) {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error('Такого пользователя нет');
    }
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, paymentLink } = await saga.getState().pay();
    await this.updateUser(user);
    return { paymentLink };
  }

  public async checkPayments(userId: string, courseId: string) {
    const existedUser = await this.userRepository.findUserById(userId);
    if (!existedUser) {
      throw new Error('Такого пользователя нет');
    }
    const userEntity = new UserEntity(existedUser);
    const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService);
    const { user, status } = await saga.getState().checkPayment();
    await this.updateUser(user);
    return { status };
  }

  private updateUser(user: UserEntity) {
    return Promise.all([
      this.userEventEmmiter.handle(user),
      this.userRepository.updateUser(user),
    ]);
  }
}
