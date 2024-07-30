import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/userContext';
import { LanguageContext } from '../../context/languageContext';
import languageConstants from '../../constants/languagesConstants';
import { AuthAPI, UsersAPI } from '../../utils/api/api';
import Session from '../../utils/Session';
import useTranslate from '../../utils/hooks/useTranslate';
import text from './login.texts';

import { MODULES, ROLES } from '../../models/User/User.constants';

import LoginView from './Login.view';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Version': 'v6',
};

function LoginContainer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslate(text);

  const setInitialLanguage = (lang) => {
    if (!!lang && languageConstants.some((l) => l === lang)) {
      toggleLanguage(lang);
    } else {
      toggleLanguage(languageConstants[0]);
    }
  };

  const redirectUser = () => {
    Session.loadUser();
    const isAllowed =
      Session.user.hasModules([MODULES.WARREN]) && Session.user.hasRoles([ROLES.USE_NEWS]);
    const landingPage = Session.user.homepage.toString();

    if (isAllowed) {
      history.push(landingPage);
    } else {
      history.push('/login');
      setUser({});
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values?.password) {
      errors.password = t('required');
    }

    if (!values?.username) {
      errors.username = t('required');
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setErrorMsg(null);
    try {
      const auth = await AuthAPI.login(values);
      const headersWithToken = { ...headers, Authorization: `Bearer ${auth.accessToken}` };
      const userMainData = await UsersAPI.fetchMe(headersWithToken);
      const userData = await UsersAPI.fetchContext(headersWithToken);
      axios.defaults.headers.common = { ...headersWithToken, 'x-account-key': userData.accountKey };
      delete userData.password;

      setUser({ ...userData, ...userMainData, ...auth });
      setInitialLanguage(userMainData?.meta?.language);
      redirectUser();
    } catch (error) {
      setErrorMsg(t('connectionError'));
    }
  };

  const handleForgotPassword = () => {
    history.push('/forgotPassword');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!!user?.id && !!user?.accessToken) {
      setInitialLanguage(user?.meta?.language);
      redirectUser();
    } else {
      setInitialLanguage(navigator.language.split('-')[0]);
    }
  }, []);

  return (
    <div>
      <LoginView
        onSubmit={handleSubmit}
        errorMsg={errorMsg}
        validate={validate}
        t={t}
        onForgotPassword={handleForgotPassword}
        handleClickShowPassword={handleClickShowPassword}
        showPassword={showPassword}
      />
    </div>
  );
}

export default LoginContainer;
