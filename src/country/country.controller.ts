import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new country' })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }
  
  @ApiOperation({ summary: 'Get all countries' })
  @Get()
  findAll() {
    return this.countryService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a country by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }
  
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a country by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }
  
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a country by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
