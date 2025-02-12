import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { UserManagementModule } from './../src/user-management.module'

describe('UserManagementController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserManagementModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })
})
