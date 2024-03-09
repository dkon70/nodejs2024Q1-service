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
  createTrack(@Param('id') id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('/album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}
