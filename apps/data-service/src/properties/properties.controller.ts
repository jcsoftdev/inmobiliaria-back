import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { PropertiesService } from './properties.service'
import {
  CreatePropertyDto,
  PROPERTIES_PATTERNS,
  UpdatePropertyDto,
} from '@app/contracts/properties'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PROPERTIES_PATTERNS.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    console.log({ createPropertyDto })
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
  update(@Payload() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(
      updatePropertyDto.id,
      updatePropertyDto,
    )
  }

  @MessagePattern(PROPERTIES_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.propertiesService.remove(id)
  }
}
