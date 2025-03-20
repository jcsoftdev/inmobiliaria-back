import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Consumer, Kafka, EachMessagePayload } from 'kafkajs'

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] })
  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: 'kafka-service-group',
  })

  async onModuleInit() {
    try {
      console.log('🔗 Connecting to Kafka...')
      await this.consumer.connect()
      console.log('✅ Connected to Kafka')

      await this.consumer.subscribe({
        topic: 'users.created',
        fromBeginning: true,
      })
      console.log('📡 Subscribed to topic: users.created')

      await this.consumer.run({
        eachMessage: async ({
          topic,
          partition,
          message,
        }: EachMessagePayload) => {
          await new Promise((resolve) => setTimeout(resolve, 0))
          console.log(
            `📥 Received message: ${message.value?.toString()} on topic ${topic}, partition ${partition}`,
          )
        },
      })
    } catch (error) {
      console.error('❌ Error in Kafka Consumer:', error)
    }
  }

  async onModuleDestroy() {
    console.log('🔌 Disconnecting from Kafka...')
    await this.consumer.disconnect()
    console.log('🛑 Kafka consumer disconnected')
  }

  async processMessage(message: unknown): Promise<{ success: boolean }> {
    console.log('🔄 Processing Kafka message:', message)

    await new Promise((resolve) => setTimeout(resolve, 0))
    // Ensure message is properly handled
    if (!message || typeof message !== 'object') {
      console.error('⚠️ Invalid message format:', message)
      return { success: false }
    }

    // Your processing logic...
    return { success: true }
  }
}
