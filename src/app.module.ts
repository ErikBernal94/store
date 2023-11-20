import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { StoreEntity } from './store/store.entity';
import { ProductEntity } from './product/product.entity';
import { ProductStoreModule } from './product-store/product-store.module';

@Module({
  imports: [StoreModule, ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'store',
      entities: [StoreEntity, ProductEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ProductStoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
