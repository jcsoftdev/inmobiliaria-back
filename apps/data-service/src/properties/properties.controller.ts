import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { PropertiesService } from './properties.service'
import {
  PROPERTIES_PATTERNS,
  CreatePropertyDto,
  UpdatePropertyDto,
} from '@app/contracts/properties'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PROPERTIES_PATTERNS.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto)
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ALL)
  findAll() {
    return this.propertiesService.findAll()
  }

  @MessagePattern(PROPERTIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PROPERTIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: number; data: UpdatePropertyDto }) {
    return this.propertiesService.update(id, data)
  }

  @MessagePattern(PROPERTIES_PATTERNS.REMOVE)
  delete(@Payload() playload: { id: number }) {
    return this.propertiesService.remove(playload.id)
  }
}
