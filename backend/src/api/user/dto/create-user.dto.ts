import { Mixin } from 'ts-mixer'
import { UserDto } from './user.dto'
import { UserPsdDto } from './user-psd.dto'
import { CaptchaDto } from '@/api/captcha/dto/captcha.dto'

export class CreateUserDto extends Mixin(UserDto, UserPsdDto, CaptchaDto) {}
