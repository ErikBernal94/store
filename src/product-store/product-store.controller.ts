import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProductStoreService } from './product-store.service';
import { StoreDto } from 'src/store/store.dto';
import { StoreEntity } from 'src/store/store.entity';
import { plainToInstance } from 'class-transformer';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductStoreController {
    constructor(private readonly productStoreService: ProductStoreService){}

    @Post(':productId/stores/:storeId')
    async addStoreProduct(
        @Param('storeId') storeId: string,
        @Param('productId') productId: string,
    ) {
        return await this.productStoreService.addStoreToProduct(
        productId,
        storeId,
        );
    }

    @Get(':productId/stores/:storeId')
    async findStoreFromProduct(
        @Param('storeId') storeId: string,
        @Param('productId') productId: string,
    ) {
        return await this.productStoreService.findStoreFromProduct(
        productId,
        storeId,
        );
    }

    @Get(':productId/stores')
    async findStoresFromProduct(
        @Param('productId') productId: string,
    ) {
        return await this.productStoreService.findStoresFromProduct(
        productId,
        );
    }

    @Put(':productId/stores')
    async updateStoresFromProduct(
        @Body() storesDto: StoreDto[],
        @Param('productId') productId: string,
    ) {
        const stores = plainToInstance(StoreEntity, storesDto);
        return await this.productStoreService.updateStoresFromProduct(
        productId,
        stores,
        );
    }

    @Delete(':productId/stores/:storeId')
    @HttpCode(204)
    async deleteStoresFromProduct(
        @Param('productId') productId: string,
        @Param('storeId') storeId: string,
    ) {
        return await this.productStoreService.deleteStoreFromProduct(
        productId,
        storeId,
        );
    }
}
