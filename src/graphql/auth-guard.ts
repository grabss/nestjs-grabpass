import {
  createParamDecorator,
  Inject,
  Injectable,
  type ExecutionContext
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Grabpass } from 'grabpass'

import { GRABPASS } from '../grabpass.constants'

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
}
