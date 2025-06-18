import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as PassportHttpBasicStrategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(PassportHttpBasicStrategy, 'basic') {
  constructor() {
    super(); 
  }

  async validate(username: string, password: string): Promise<any> {
    // Validación básica (cámbiala por una DB o servicio real si quieres)
    if (username === 'admin' && password === 'secretpass1942') {
      return { userId: 1, username };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
