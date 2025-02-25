import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '@data-service/prisma.service'

import { AgenciesController } from './agencies.controller'
import { AgenciesService } from './agencies.service'

describe('AgenciesController', () => {
  let controller: AgenciesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciesController],
      providers: [AgenciesService, PrismaService],
    }).compile()

    controller = module.get<AgenciesController>(AgenciesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
