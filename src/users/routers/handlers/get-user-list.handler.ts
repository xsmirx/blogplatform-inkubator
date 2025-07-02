import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { UserQueryInput } from '../inputs/user-query-input';
import { usersQueryRepository } from '../../repositories/users.query-repository';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getUserListHandler = async (req: Request, res: Response) => {
  try {
    const queries = matchedData<UserQueryInput>(req, {
      includeOptionals: true,
    });
    const usersList = await usersQueryRepository.findAll(queries);
    res.status(200).send(usersList);
  } catch (error) {
    errorsHandler(error, res);
  }
};
