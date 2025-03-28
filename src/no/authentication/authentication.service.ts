import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from './entities/authentication.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginOrganizationDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
    private tokenBlacklist = new Set<string>(); // In-memory blacklist
    constructor(
        @InjectRepository(Authentication)
        private readonly authenticationRepository: Repository<Authentication>,
        private readonly jwtService: JwtService,
    ) {}
    
    async register(registerDto:CreateAuthenticationDto){

        const existingOrg = await this.authenticationRepository.findOne({
             where: { email: registerDto.email } });
        if (existingOrg) {
            throw new BadRequestException('organisation with email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newOrganization = this.authenticationRepository.create({
            fullName: registerDto.fullName,
            email: registerDto.email,
            password: hashedPassword,
            sector: registerDto.sector,
            phoneNumber: registerDto.phoneNumber,
          });

          const savedOrg = await this.authenticationRepository.save(newOrganization);

          const { password, ...result } = savedOrg;
          return savedOrg // Exclude the password from the result
    }

    async login(loginDto:LoginOrganizationDto){
        const organization = await this.authenticationRepository.findOne({
            where: { email: loginDto.email } });

        if (!organization) {
            throw new BadRequestException('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(loginDto.password, organization.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid email or password');
        }

        const payload = { sub: organization.id, email: organization.email };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });

        const {password, ...orgDetails} = organization;

        return{ access_token: token, organization: orgDetails };
    }

    async logout(token:string){
        this.tokenBlacklist.add(token);
        return { message: 'Logged out successfully' };
    }
    isTokenBlacklisted(token: string): boolean {
        return this.tokenBlacklist.has(token);
    }

}
