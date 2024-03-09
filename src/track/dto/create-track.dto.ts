import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;
}
