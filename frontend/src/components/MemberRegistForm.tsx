import React, {useRef, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Formik, FormikProps} from 'formik';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import styled from 'styled-components';
import * as Yup from 'yup';
import CommonIcon from './CommonIcon';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from './CustomButton';
import VerificationModal from './VerificationModal';
import {useVerifyStartMutation} from '../apis/memberRegistApi';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export type RegistFormValues = {
  phone: string;
  name: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  cardNumber: string;
  companyName:
    | '현대'
    | '신한'
    | 'KB국민'
    | '롯데'
    | '하나'
    | '우리'
    | 'NH농협'
    | 'IBK';
  cardPassword: string;
  cvv: string;
  cardExp: string;
};

const initialValues: RegistFormValues = {
  phone: '',
  name: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  gender: 'MALE',
  birthDate: '',
  cardNumber: '',
  companyName: '현대',
  cardPassword: '',
  cvv: '',
  cardExp: '',
};

const RegistSchema = Yup.object().shape({
  phone: Yup.string(),
  // .required('필수 항목입니다.'),
  name: Yup.string(),
  // .required('필수 항목입니다.'),
  nickname: Yup.string(),
  // .required('필수 항목입니다.'),
  password: Yup.string()
    // .required('필수 항목입니다.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    '비밀번호가 일치하지 않습니다.',
  ),
  // .required('필수 항목입니다.'),
  gender: Yup.string().oneOf(
    ['MALE', 'FEMALE'],
    '남성 또는 여성을 선택해주세요.',
  ),
  // .required('필수 항목입니다.'),
  birthDate: Yup.string()
    // .required('필수 항목입니다.'),
    .matches(
      /^[1-2][0-9][0-9][0-9]\/[0-1][0-9]\/[0-3][0-9]$/,
      'YYYY/MM/DD 형식으로 입력해주세요.',
    ),
  cardNumber: Yup.string()
    // .required('필수 항목입니다.')
    .matches(
      /^[0-9]{4}\/[0-9]{4}\/[0-9]{4}\/[0-9]{4}$/,
      'XXXX/XXXX/XXXX/XXXX형식으로 입력해주세요.',
    )
    .max(19, '카드번호는 16자리여야 합니다.'),
  companyName: Yup.string().oneOf(
    ['현대', '신한', 'KB국민', '롯데', '하나', '우리', 'NH농협', 'IBK'],
    '카드사를 선택해주세요.',
  ),
  cardPassword: Yup.string()
    // .required('필수 항목입니다.')
    .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
    .min(4, '비밀번호는 4자리입니다.')
    .max(4, '비밀번호는 4자리입니다.'),
  cvv: Yup.string()
    // .required('필수 항목입니다.')
    .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
    .min(3, 'CVV/CVC는 3자리여야 합니다.')
    .max(3, 'CVV/CVC는 3자리여야 합니다.'),
  cardExp: Yup.string()
    // .required('필수 항목입니다.')
    .matches(/^[0-1][0-9]\/[23-99]{2}$/, 'MM/YY 형식으로 입력해주세요.'),
});

interface MemberRegistFormProps {
  onSubmit: (values: RegistFormValues) => void;
  isSignupLoading: boolean;
}

const RegistForm: React.FC<MemberRegistFormProps> = ({
  onSubmit,
  isSignupLoading,
}: MemberRegistFormProps) => {
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    useState(false);

  const [VerificationModalPropsPhone, setVerificationModalPropsPhone] =
    useState('');

  const isVerified = useSelector((state: RootState) => state.auth.isVerified); //전화번호가 인증된 상태인지 확인

  const [verifyStart, {isLoading}] = useVerifyStartMutation();

  const handleSubmit = async (values: RegistFormValues) => {
    if (!isVerified) Alert.alert('전화번호를 인증해주세요');
    else {
      await RegistSchema.validate(values, {abortEarly: false})
        .then(() => onSubmit(values))
        .catch(error => {
          const errorList = {};
          if (error.inner) {
            error.inner.forEach(err => {
              errorList[err.path] = err.message;
            });
          } // 검증 오류 메시지를 문자열로 변환
          // const errorString = Object.entries(errorList)
          //   .map(([key, value]) => `${key}: ${value}`)
          //   .join('\n');
          Alert.alert('회원가입 양식을 다시 확인해주세요.');
          console.log(errorList);
        });
    }
  };

  const handleVerificationButtonPress = (phone: string) => {
    if (phone === '') Alert.alert('전화번호를 입력해주세요.');
    else {
      const data = {phone: phone};
      verifyStart(data)
        .unwrap()
        .then(response => {
          console.log(response);
          setIsVerificationModalVisible(true);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          Alert.alert('유효한 전화번호가 아닙니다.');
        });
    }
  };

  const handleVerificationModalClose = () => {
    setIsVerificationModalVisible(false);
  };

  return (
    <RegistFormView>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <View>
              <InputView>
                <CommonIcon
                  iconName="call-outline"
                  iconStyle={{marginRight: 5}}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    value={values.phone}
                    placeholder="전화번호"
                    placeholderTextColor="grey"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="numeric"
                    style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                  />
                  <CustomButton
                    text={isVerified ? '인증 완료' : '인증하기'}
                    textStyle={{
                      color: 'white',
                      fontSize: 12,
                      fontFamily: 'SeoulNamsanM',
                    }}
                    buttonStyle={{
                      backgroundColor: '#FFBDC1',
                      paddingHorizontal: 10,
                      marginVertical: 10,
                    }}
                    onPress={() => {
                      // VerificationModal 컴포넌트에 필요한 값을 전달
                      setVerificationModalPropsPhone(values.phone);
                      handleVerificationButtonPress(values.phone);
                    }}
                    disabled={isLoading || isVerified}
                  />
                </View>
              </InputView>
              {errors.phone && (
                <RegistErrorMessage>{errors.phone}</RegistErrorMessage>
              )}
            </View>

            <View>
              <InputView>
                <CommonIcon
                  iconName="person-circle-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.name}
                  placeholder="이름"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.name && (
                <RegistErrorMessage>{errors.name}</RegistErrorMessage>
              )}
            </View>

            <View>
              <InputView>
                <CommonIcon
                  iconName="person-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.nickname}
                  placeholder="닉네임"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('nickname')}
                  onBlur={handleBlur('nickname')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.nickname && (
                <RegistErrorMessage>{errors.nickname}</RegistErrorMessage>
              )}
            </View>

            <View>
              <InputView>
                <CommonIcon
                  iconName="lock-closed-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.password}
                  placeholder="비밀번호             "
                  placeholderTextColor="grey"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.password && (
                <RegistErrorMessage>{errors.password}</RegistErrorMessage>
              )}
            </View>

            <View>
              <InputView>
                <CommonIcon
                  iconName="lock-open-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.passwordConfirm}
                  placeholder="비밀번호 확인        "
                  placeholderTextColor="grey"
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  secureTextEntry
                  style={{fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.passwordConfirm && (
                <RegistErrorMessage>
                  {errors.passwordConfirm}
                </RegistErrorMessage>
              )}
            </View>

            <InputView>
              {/* <InputView> */}
              <MaterialIcon
                name="gender-male-female"
                size={20}
                color="#747273"
              />
              <RegistFormText
                style={{fontSize: 14, marginLeft: 10, marginRight: 5}}>
                성별
              </RegistFormText>
              <View
                style={{
                  width: '50%',
                  marginTop: 2,
                  marginBottom: 5,
                  borderRadius: 10,
                }}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={handleChange('gender')}
                  style={{color: '#747273'}}>
                  <Picker.Item
                    style={{fontSize: 13}}
                    label="남성"
                    value="MALE"
                  />
                  <Picker.Item
                    style={{fontSize: 13}}
                    label="여성"
                    value="FEMALE"
                  />
                </Picker>
              </View>
              {/* </InputView> */}
              {errors.gender && (
                <RegistErrorMessage>{errors.gender}</RegistErrorMessage>
              )}
            </InputView>

            <View>
              <InputView>
                <CommonIcon
                  iconName="calendar-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.birthDate}
                  placeholder="생년월일"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('birthDate')}
                  onBlur={handleBlur('birthDate')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.birthDate && (
                <RegistErrorMessage>{errors.birthDate}</RegistErrorMessage>
              )}
            </View>

            <View>
              <InputView>
                <CommonIcon
                  iconName="card-outline"
                  iconStyle={{marginRight: 5}}
                />
                <TextInput
                  value={values.cardNumber}
                  placeholder="카드 번호"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('cardNumber')}
                  onBlur={handleBlur('cardNumber')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.cardNumber && (
                <RegistErrorMessage>{errors.cardNumber}</RegistErrorMessage>
              )}
            </View>

            <View style={{marginLeft: 30}}>
              <InputView>
                <RegistFormText style={{marginRight: 5}}>카드사</RegistFormText>
                <View
                  style={{
                    width: '50%',
                    marginTop: 2,
                    marginBottom: 5,
                    borderRadius: 10,
                  }}>
                  <Picker
                    selectedValue={values.companyName}
                    onValueChange={handleChange('companyName')}
                    style={{color: '#747273'}}>
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="현대"
                      value="현대"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="신한"
                      value="신한"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="KB국민"
                      value="KB국민"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="롯데"
                      value="롯데"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="하나"
                      value="하나"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="우리"
                      value="우리"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="NH농협"
                      value="NH농협"
                    />
                    <Picker.Item
                      style={{fontSize: 13}}
                      label="IBK"
                      value="IBK"
                    />
                  </Picker>
                </View>
              </InputView>
              {errors.companyName && (
                <CardRegistErrorMessage>
                  {errors.companyName}
                </CardRegistErrorMessage>
              )}
            </View>

            <View style={{marginLeft: 30}}>
              <InputView>
                <RegistFormText style={{marginRight: 5}}>
                  비밀번호
                </RegistFormText>
                <TextInput
                  value={values.cardPassword}
                  placeholder="카드 비밀번호"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('cardPassword')}
                  onBlur={handleBlur('cardPassword')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.cardPassword && (
                <CardRegistErrorMessage>
                  {errors.cardPassword}
                </CardRegistErrorMessage>
              )}
            </View>

            <View style={{marginLeft: 30}}>
              <InputView>
                <RegistFormText style={{marginRight: 5}}>
                  CVV/CVC
                </RegistFormText>
                <TextInput
                  value={values.cvv}
                  placeholder="CVV/CVC"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.cvv && (
                <CardRegistErrorMessage>{errors.cvv}</CardRegistErrorMessage>
              )}
            </View>

            <View style={{marginLeft: 30}}>
              <InputView>
                <RegistFormText style={{marginRight: 5}}>
                  유효기간
                </RegistFormText>
                <TextInput
                  value={values.cardExp}
                  placeholder="카드 유효기간"
                  placeholderTextColor="grey"
                  onChangeText={handleChange('cardExp')}
                  onBlur={handleBlur('cardExp')}
                  style={{color: '#747273', fontFamily: 'SeoulNamsanM'}}
                />
              </InputView>
              {errors.cardExp && (
                <CardRegistErrorMessage>
                  {errors.cardExp}
                </CardRegistErrorMessage>
              )}
            </View>

            <View style={{marginTop: '5%'}}>
              <CustomButton
                text="회원가입"
                textStyle={{
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'SeoulNamsanM',
                }}
                buttonStyle={{
                  backgroundColor: '#FFBDC1',
                  paddingVertical: 10,
                }}
                onPress={handleSubmit}
                disabled={isSignupLoading}
              />
            </View>
          </View>
        )}
      </Formik>

      <VerificationModal
        isVisible={isVerificationModalVisible}
        onClose={handleVerificationModalClose}
        phone={VerificationModalPropsPhone}
      />
    </RegistFormView>
  );
};

const RegistFormView = styled(View)`
  padding: 10%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
`;

const RegistFormText = styled(Text)`
  font-family: 'SeoulNamsanM';
  font-size: 12px;
  color: grey;
`;

const RegistErrorMessage = styled(Text)`
  color: red;
  font-size: 10px;
  margin-left: 27px;
  margin-bottom: 3px;
  font-family: 'SeoulNamsanM';
`;

const CardRegistErrorMessage = styled(Text)`
  color: red;
  font-size: 10px;
  margin-left: 52px;
  margin-bottom: 3px;
  font-family: 'SeoulNamsanM';
`;

const InputView = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export default RegistForm;
