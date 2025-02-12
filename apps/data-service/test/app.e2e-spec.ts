import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { DataServiceModule } from './../src/data-service.module'

describe('DataServiceController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DataServiceModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
