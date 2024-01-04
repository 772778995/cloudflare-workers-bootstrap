import { Mixin } from 'ts-mixer'
import { UserEmailDto } from './user-email.dto'
import { UserPsdDto } from './user-psd.dto'

export class UserDto extends Mixin(UserEmailDto, UserPsdDto) {}
