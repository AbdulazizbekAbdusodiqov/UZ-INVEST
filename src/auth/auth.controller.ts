import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';
import { UserSignInDto } from '../user/dto';
import { ResponseFields } from '../types';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { AdminSignInDto, CreateAdminDto } from '../admin/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  //=================================  For Users ============================================
  
  @ApiOperation({ summary: "Yangi foydalanuvchilarni ro'yxatdan o'tkazish" })
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() userSignInDto: UserSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signIn(userSignInDto, res)
  }
  
  @Get("sign-out")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res)
  }
  
  @Get(":id/refresh")
  refresh(
    @Param("id") userId: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields>{
    return this.authService.refreshToken(userId, refreshToken, res)
  }
  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.authService.activate(link)
  }
  //=================================  For Admin ============================================
  

  @ApiOperation({ summary: "Yangi admin ro'yxatdan o'tkazish" })
  @Post('admin/sign-up')
  signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSignUp(createAdminDto)
  }
  
  
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  adminSignIn(
    @Body() adminSignInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ):Promise<ResponseFields> {
    return this.authService.adminSignIn(adminSignInDto, res)
  }

  @Get("admin/sign-out")
  AdminSignout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminSignOut(refreshToken, res)
  }

  @Get("admin/:id/refresh")
  AdminRefresh(
    @Param('id') id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ):Promise<ResponseFields> {
    return this.authService.AdminRefreshToken(+id, refreshToken, res)
  }
  
  @Get('admin/activate/:link')
  activateAdmin(@Param('link') link:string){
    return this.authService.activate(link)
  }
  
}
