import { Injectable } from '@nestjs/common'

@Injectable()
export class DataServiceService {
  getHello(): string {
    return 'Hello World!'
  }
}
