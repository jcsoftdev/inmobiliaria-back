import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SharedConfigService {
  constructor(private readonly configService: ConfigService) {}

  isDev(): boolean {
    return this.getMode() === 'dev' || this.getMode() === 'development'
  }

  getMode(): string {
    return this.configService.get<string>('mode') ?? ''
  }

  getGrpcUrl(): string {
    return this.configService.get<string>('grpc.url') ?? ''
  }

  get<T>(key: string, defaultValue: T): T {
    return this.configService.get<T>(key, defaultValue ?? (null as T))
  }
}
