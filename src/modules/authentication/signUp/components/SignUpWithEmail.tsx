import {Formik, FormikHelpers} from 'formik';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import InputField from '../../../../components/input/InputField';
import PasswordField from '../../../../components/input/PasswordField';
import OrContainer from '../../common/OrContainer';
import SocialMediaLogin from '../../common/GoogleLogin';
import {showToastWithGravity} from '../../../../utils/utils';
import useStoreUserAndNavigate from '../../../../hooks/useStoreUserAndNavigate';
import {useAppTheme} from '../../../../utils/theme';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const userInfo: FormData = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter valid email address')
    .required('Email cannot be empty.'),
  password: Yup.string().trim().required('Password cannot be empty'),
  name: Yup.string().trim().required('Full Name cannot be empty'),
});

const SignUpWithEmail = () => {
  const navigation = useNavigation<any>();
  const {storeDetails} = useStoreUserAndNavigate();
  const theme = useAppTheme();
  const styles = makeStyles(theme.colors);
  const {isConnected, isInternetReachable} = useNetInfo();
  const [googleLoginRequested, setGoogleLoginRequested] =
    useState<boolean>(false);

  /**
   * function create user with provided the email and password and create and store token in context
   * @param values:input values
   * @param formikHelpers
   * @returns {Promise<void>}
   */
  const createUser = async (
    values: FormData,
    formikHelpers: FormikHelpers<FormData>,
  ) => {
    if (isConnected && isInternetReachable) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
        await auth()?.currentUser?.updateProfile({displayName: values.name});

        const idTokenResult = await auth()?.currentUser?.getIdTokenResult();

        await storeDetails(idTokenResult, response.user);
      } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
          showToastWithGravity('Account already exist on this email-id');
        } else {
          showToastWithGravity(error.message);
        }
      } finally {
        formikHelpers.setSubmitting(false);
      }
    } else {
      showToastWithGravity('Please check your internet connection.');
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={userInfo}
      validationSchema={validationSchema}
      onSubmit={createUser}>
      {({
        isSubmitting,
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
      }) => (
        <>
          <View style={styles.inputContainer}>
            <InputField
              inputMode={'text'}
              disabled={googleLoginRequested || isSubmitting}
              name="name"
              value={values.name}
              onBlur={handleBlur('name')}
              required
              inputLabel="Full Name"
              placeholder="Enter full name"
              error={!!touched.name && !!errors.name}
              errorMessage={touched.name ? errors.name : null}
              onChangeText={handleChange('name')}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputField
              inputMode={'email'}
              disabled={googleLoginRequested || isSubmitting}
              name="email"
              value={values.email}
              onBlur={handleBlur('email')}
              required
              inputLabel="Email Address"
              placeholder="Enter email address"
              error={!!touched.email && !!errors.email}
              errorMessage={touched.email ? errors.email : null}
              onChangeText={handleChange('email')}
            />
          </View>
          <View style={styles.inputContainer}>
            <PasswordField
              disabled={googleLoginRequested || isSubmitting}
              value={values.password}
              required
              onBlur={handleBlur('password')}
              inputLabel="Password"
              placeholder="Password"
              secureTextEntry
              error={!!touched.password && !!errors.password}
              errorMessage={touched.password ? errors.password : null}
              onChangeText={handleChange('password')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              labelStyle={[theme.fonts.bodyLarge]}
              style={styles.containedButton}
              contentStyle={styles.button}
              mode="contained"
              onPress={() => handleSubmit()}
              loading={isSubmitting}
              disabled={googleLoginRequested || isSubmitting}>
              Sign Up
            </Button>
          </View>

          <OrContainer />
          <SocialMediaLogin
            loginRequested={googleLoginRequested || isSubmitting}
            googleLoginRequested={googleLoginRequested}
            setGoogleLoginRequested={setGoogleLoginRequested}
          />

          <View style={styles.loginMessage}>
            <Text variant={'bodyMedium'} style={styles.dontHaveMessage}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              disabled={googleLoginRequested || isSubmitting}
              onPress={() => navigation.navigate('Login')}>
              <Text variant={'bodyLarge'} style={styles.signUpText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    inputContainer: {
      marginTop: 20,
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    buttonContainer: {
      marginTop: 28,
    },
    containedButton: {
      borderRadius: 12,
    },
    button: {
      height: 44,
    },
    loginMessage: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    dontHaveMessage: {
      color: colors.neutral300,
    },
    signUpText: {color: colors.primary, paddingLeft: 8},
  });

export default SignUpWithEmail;
