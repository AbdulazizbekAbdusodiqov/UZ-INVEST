import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { UserGuard } from '../guards/user.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @ApiOperation({ summary: 'Create a new bid' })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }
  
  @ApiOperation({ summary: 'Get all bids' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.bidsService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a bid by ID' })
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a bid by ID' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidsService.update(+id, updateBidDto);
  }
  
  @ApiOperation({ summary: 'Delete a bid by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(+id);
  }
}
