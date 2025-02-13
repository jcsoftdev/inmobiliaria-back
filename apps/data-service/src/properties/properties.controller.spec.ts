import { Test, TestingModule } from '@nestjs/testing'
import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'
import { PrismaService } from '@data-service/prisma.service'

describe('PropertiesController', () => {
  let controller: PropertiesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [PropertiesService, PrismaService],
    }).compile()

    controller = module.get<PropertiesController>(PropertiesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
