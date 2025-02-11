import { Injectable } from '@nestjs/common'

@Injectable()
export class RealStateGatewayService {
  getHello(): string {
    return 'Hello World!'
  }
}
