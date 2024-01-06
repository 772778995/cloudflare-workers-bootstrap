import { Mixin } from 'ts-mixer'
import { UserPsdDto } from './user-psd.dto'
import { AccountDto } from './account.dto'

export class PsdLoginDto extends Mixin(AccountDto, UserPsdDto) {}
