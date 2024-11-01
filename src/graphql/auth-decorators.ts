import {
  applyDecorators,
  createParamDecorator,
  Inject,
  Injectable,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Grabpass } from 'grabpass'

import { GRABPASS } from '../grabpass.constants'

import type { CanActivate, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

const GRABPASS_AUTH_CONTEXT = 'GRABPASS_AUTH_CONTEXT'

export const AuthContext = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req: Request = GqlExecutionContext.create(context).getContext().req
    return req[GRABPASS_AUTH_CONTEXT]
  }
)

export function Auth() {
  return applyDecorators(UseGuards(GrabpassGraphqlAuthGuard))
}

@Injectable()
export class GrabpassGraphqlAuthGuard implements CanActivate {
  constructor(@Inject(GRABPASS) private readonly grabpass: Grabpass) {}

  canActivate(context: ExecutionContext) {
    const req: Request = GqlExecutionContext.create(context).getContext().req
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException()
    }

    const accessToken = authorization.replace('Bearer ', '')

    try {
      req[GRABPASS_AUTH_CONTEXT] = this.grabpass.verifyAccessToken(accessToken)
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
