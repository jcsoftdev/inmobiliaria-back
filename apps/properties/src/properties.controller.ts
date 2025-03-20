import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  CreatePropertyDto,
  PROPERTIES_PATTERNS,
  PropertyProps,
  UpdatePropertyDto,
} from '@app/contracts/properties'
import { SERVICES } from '@app/shared'

import { PropertiesService } from './properties.service'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.CREATE)
  create(@Payload() CreatePropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(CreatePropertyDto)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.FIND_ALL)
  findAll(props: PropertyProps) {
    console.log({ props })
    return this.propertiesService.findAll(props)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.propertiesService.findOne(id)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.UPDATE)
  update(@Payload() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(updatePropertyDto)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.DELETE)
  delete(@Payload() id: string) {
    return this.propertiesService.delete(id)
  }
}
