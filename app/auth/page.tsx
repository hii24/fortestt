'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { checkAccessExists, storageUser } from '@/services/auth/auth.helper';
import axiosInter from '@/api/interceptors';
import { createProxyUrl, getAllDepositsUrl } from '@/config/api.config';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function AuthTypeHandler({ setAuthTypeLogin }: { setAuthTypeLogin: (value: boolean) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('register')) {
      setAuthTypeLogin(false);
    }
  }, [searchParams, setAuthTypeLogin]);

  return null;
}

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authTypeLogin, setAuthTypeLogin] = useState(true);
  const t = useTranslations('authPage');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [samePasswrd, setSamePassword] = useState(false);

  const login = async (redirect: string) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(createProxyUrl(`/user/api/auth/authorization/`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({
          is_admin: false,
          username: email,
          password: password,
        }),
      });

      const { access, refresh } = await res.json();

      if (res?.ok && access && refresh) {
        let done = storageUser({ access, refresh }, { username: email, is_admin: false });
        try {
          const haveAdmin = (await axiosInter.get(getAllDepositsUrl())).status !== 403;
          done = storageUser({ access, refresh }, { username: email, is_admin: haveAdmin });
        } catch (err) {
          console.log('default user', err);
        }
        if (done) router.push(redirect);
      } else {
        setError('Wrong email or password');
      }
    } catch (err) {
      setError('Error logging in.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
      // console.log(error);
    }
  };

  const register = async () => {
    if (password !== repeatPassword) return;
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(createProxyUrl(`/user/api/auth/registration/`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({
          code: localStorage?.getItem('r') ?? 'string',
          username: email,
          password: password,
        }),
      });

      const resBody = await res.json();

      console.log('regres', res);
      if (res?.ok && resBody.access && resBody.refresh) {
        // const done = storageUser(
        //   { access: resBody.access, refresh: resBody.refresh },
        //   { username: email, is_admin: false }
        // );

        setAuthTypeLogin(true);
        setPassword('');
        setRepeatPassword('');
      } else {
        setError(`${resBody?.username?.[0]}`);
        console.log('resBody?.username', resBody?.username);
      }
    } catch (err) {
      setError('Error sign up.');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
      setSamePassword(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const redirect = String(new URLSearchParams(window.location.search).get('redirect') || '/');
    if (authTypeLogin) {
      login(redirect);
    } else {
      register();
    }
  };

  useEffect(() => {
    const accessExist = checkAccessExists();
    const wantsRegister = searchParams.has('register');
    if (accessExist && !wantsRegister) window.location.replace('/');
  }, [searchParams]);

  return (
    <Suspense
      fallback={
        <div className="h-full w-full grid place-content-center">
          <p>{t('loading')}</p>
        </div>
      }>
      <AuthTypeHandler setAuthTypeLogin={setAuthTypeLogin} />
      <div className={`${styles.authPage} bg-[#fffafa] sm:bg-[#f5f0f0]`}>
        <div className={`${styles.authContent} `}>
          <div
            className={`${styles.authForm} sm:h-[777px] sm:px-8 h-min sm:rounded-[15px] sm:!mx-0 py-10 sm:max-w-[508px] max-w-full`}>
            <Link href="/" className={'max-w-[75px] md:max-w-[93px]'}>
              <Image src="/icons/logo.svg" fill alt="logo" className={'object-contain !relative'} />
            </Link>

            <form className="mt-8 gap-3" onSubmit={handleSubmit}>
              <fieldset>
                 <label htmlFor="email-address">{t('email.label')}</label>
                <input
                  id="email"
                  name="email"
                  type={'email'}
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                   placeholder={t('email.placeholder')}
                />
              </fieldset>
              <fieldset>
                 <label htmlFor="password">{t('password.label')}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                   placeholder={t('password.placeholder')}
                />
              </fieldset>

              {!authTypeLogin && (
                <fieldset>
                  <label htmlFor="repeat_password">{t('repeatPassword.label')}</label>
                  <input
                    id="repeat_password"
                    name="repeat_password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className={styles.inputField}
                    placeholder={t('repeatPassword.placeholder')}
                  />
                  {!samePasswrd && repeatPassword !== '' && repeatPassword !== password && (
                    <p className="text-center text-red-400 py-2">{t('repeatPassword.mismatch')}</p>
                  )}
                </fieldset>
              )}
              {error && (
                <p className="text-red-500">{!authTypeLogin && error?.includes('unique') ? t('errors.accountExists') : error}</p>
              )}

              {/*               {!authTypeLogin && (
                <fieldset>
                  <label htmlFor="code">Referral Code (optional)</label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={styles.inputField}
                    placeholder="Code"
                  />
                  {error && <p className="text-center text-red-400 py-2">{error}</p>}
                </fieldset>
              )} */}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? t('loading') : authTypeLogin ? t('buttons.signIn') : t('buttons.signUp')}
                </button>
              </div>
            </form>
            <button className="px-2" type="button" onClick={() => setAuthTypeLogin((prev) => !prev)}>
              {authTypeLogin ? t('switch.toRegister') : t('switch.toLogin')}
            </button>
          </div>

          <Image
            className="max-xl:hidden max-w-[612px] max-h-[777px]"
            src="/images/admin-login.png"
            alt="Admin Login"
            width={612}
            height={777}
            priority
          />
        </div>
      </div>
    </Suspense>
  );
}
