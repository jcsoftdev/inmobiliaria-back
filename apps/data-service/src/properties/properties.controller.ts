import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import {
  PROPERTIES_PATTERNS,
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertyProps,
} from '@app/contracts/properties'
import { SERVICES } from '@app/shared'

import { PropertiesService } from './properties.service'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.FIND_ALL)
  findAll(props: PropertyProps) {
    return this.propertiesService.findAll(props)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.propertiesService.findOne(id)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdatePropertyDto }) {
    return this.propertiesService.update(id, data)
  }

  @GrpcMethod(SERVICES.PROPERTY, PROPERTIES_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: string }) {
    return this.propertiesService.remove(payload.id)
  }
}
