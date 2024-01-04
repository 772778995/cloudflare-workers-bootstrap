import { Mixin } from 'ts-mixer'
import { UserEmailOptionalDto } from './user-email.dto'
import { UserPsdDto } from './user-psd.dto'

export class UpdateUserDto extends Mixin(UserEmailOptionalDto, UserPsdDto) {}
