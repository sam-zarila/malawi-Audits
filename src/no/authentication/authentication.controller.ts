import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginOrganizationDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('register')
    async register(@Body() registerDto:CreateAuthenticationDto){

        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
            
        }
        return this.authenticationService.register(registerDto);
    }
    @Post('login')

    async login(@Body() loginDto: LoginOrganizationDto) {
        return this.authenticationService.login(loginDto);
    }
    @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        throw new BadRequestException('Authorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    return await this.authenticationService.logout(token);
  }


}
