import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  async createTrack(@Param('id') id: string) {
    return await this.favsService.createTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return await this.favsService.deleteTrack(id);
  }

  @Post('/album/:id')
  async createAlbum(@Param('id') id: string) {
    return await this.favsService.createAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return await this.favsService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  async createArtist(@Param('id') id: string) {
    return await this.favsService.createArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return await this.favsService.deleteArtist(id);
  }
}
