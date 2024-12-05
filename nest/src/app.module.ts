import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            global: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
