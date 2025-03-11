import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @ApiOperation({ summary: 'Get all entrepreneurs' })
  @UseGuards(AdminGuard)
  @Get('entrepreneur')
  findAllEntrepreneur() {
    return this.userService.findAllEntrepreneur();
  }
  
  @ApiOperation({ summary: 'Get all investors' })
  @UseGuards(AdminGuard)
  @Get('investor')
  findAllInvestor() {
    return this.userService.findAllInvestor();
  }
  
  @ApiOperation({ summary: 'Get a user by ID' })
  @UseGuards(UserGuard, UserSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update a user by ID' })
  @UseGuards(UserGuard, UserSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  
  @ApiOperation({ summary: 'Delete a user by ID' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
