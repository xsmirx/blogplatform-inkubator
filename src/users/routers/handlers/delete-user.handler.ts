import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { usersService } from '../../application/users.service';
import { HttpStatus } from '../../../core/types/http-statuses';

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await usersService.deleteUser(userId);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    errorsHandler(error, res);
  }
};
