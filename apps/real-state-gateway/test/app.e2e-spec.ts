import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { RealStateGatewayModule } from './../src/real-state-gateway.module'

describe('RealStateGatewayController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RealStateGatewayModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
