import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { Service } from 'typedi';
import { email, minLength, required } from '@utils/validators';

@Service({ transient: true })
export class LoginModel extends FormSchema {
  @validate(required(), email())
  @watch
  login = '';

  @validate(required(), minLength(3))
  @watch
  password = '';
}
