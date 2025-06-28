import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';
import { UserDTO } from '../../application/dto/user.dto';
import { usersService } from '../../application/users.service';
import { usersQueryRepository } from '../../repositories/users.query-repository';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const data = matchedData<UserDTO>(req);
    const id = await usersService.createUser(data);
    const user = await usersQueryRepository.findUserById(id);
    res.status(201).send(user);
  } catch (error) {
    errorsHandler(error, res);
  }
};
