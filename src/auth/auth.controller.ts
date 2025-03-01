import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from '../users/dto/sign_in-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: "Yangi foydalanuvchilarni ro'yxatdan o'tkazish" })
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  // @UseGuards(SuperAdminGuard)
  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Admin ro'yxatdan o'tkazish" })
  @Post('/admin/sign-up')
  adminSignUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSignUp(createAdminDto)
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() signInUserDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInUserDto, res)
  }

  @ApiOperation({ summary: "Admin tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  adminSignIn(
    @Body() signInUserDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInUserDto, res)
  }

  @HttpCode(HttpStatus.OK)
  @Get("sign-out")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res)
  }


  @HttpCode(HttpStatus.OK)
  @Post(":id/refresh")
  refresh(
    @Param("id") userId: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(userId, refreshToken, res)
  }

}

