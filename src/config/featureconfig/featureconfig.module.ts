import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeatureConfigService } from './featureconfig.service';

@Module({
    imports: [ConfigModule],
    providers: [FeatureConfigService],
    exports: [FeatureConfigService],
})
export class FeatureConfigModule {}
