import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'USER_MANAGEMENT_CLIENT',
            transport: Transport.TCP,
            options: {
              port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
            },
          },
        ]),
      ],
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
