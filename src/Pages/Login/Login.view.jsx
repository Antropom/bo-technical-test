import { loginImagePath, legalText } from '../../config';
import { Form, Field } from 'react-final-form';
import { PrimaryButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import styles from './login.module.scss';

function LoginView({
  onSubmit,
  errorMsg,
  validate,
  t,
  onForgotPassword,
  handleClickShowPassword,
  showPassword,
}) {
  const bgStyle = !!loginImagePath ? { backgroundImage: `url(${loginImagePath})` } : {};

  return (
    <div className={styles.loginWrapper} style={bgStyle}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, invalid, pristine }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field formatOnBlur name="username" label={t('username')} component={RenderTextInput} />

            <Field
              formatOnBlur
              name="password"
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              component={RenderTextInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <a className={styles.link} onClick={onForgotPassword}>
              {t('forgotPassword')}
            </a>

            <PrimaryButton
              label={t('login')}
              type="submit"
              disabled={invalid || pristine}
              className={styles.btn}
            />

            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
          </form>
        )}
      />
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;
