import {
  createParamDecorator,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Grabpass } from 'grabpass'

import { GRABPASS } from '../grabpass.constants'

import type { ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

const GRABPASS_AUTH_CONTEXT = 'GRABPASS_AUTH_CONTEXT'

export const AuthContext = createParamDecorator(
  (_, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext().req[
      GRABPASS_AUTH_CONTEXT
    ]
  }
)

@Injectable()
export class GrabpassGraphqlAuthGuard {
  constructor(@Inject(GRABPASS) private readonly grabpass: Grabpass) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const req: Request = ctx.getContext().req
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException()
    }

    const accessToken = authHeader.replace('Bearer ', '')

    try {
      req[GRABPASS_AUTH_CONTEXT] = this.grabpass.verifyAccessToken(accessToken)
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
