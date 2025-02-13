import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { PropertiesModule } from './../src/properties.module'

describe('PropertiesController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PropertiesModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
