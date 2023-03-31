import {useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {useVerifyMutation} from '../apis/memberRegistApi';
import {useDispatch} from 'react-redux';
import {verifySuccess} from '../redux/slices/authSlice';

export interface VerificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  phone: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isVisible,
  onClose,
  phone,
}) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verify, {isLoading}] = useVerifyMutation();
  const dispatch = useDispatch();

  const handleVerificationCodeChange = (text: string) => {
    setVerificationCode(text);
  };

  const handleVerificationCodeSubmit = () => {
    const data = {phone: phone, authNumber: verificationCode};
    // handle verification code submit logic here
    verify(data)
      .unwrap()
      .then(response => {
        console.log(response);
        dispatch(verifySuccess());
        onClose();
        Alert.alert('인증이 완료되었습니다.');
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        Alert.alert('인증번호를 다시 확인해주세요.');
      });
  };

  const handleCancel = () => {
    handleVerificationCodeChange(''); //취소 버튼 누를 시 인증 입력 초기화
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '80%',
            borderRadius: 5,
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: 'SeoulNamsanB',
              fontSize: 18,
              marginBottom: 10,
            }}>
            인증번호 입력
          </Text>
          <TextInput
            style={{
              borderWidth: 0.5,
              borderRadius: 5,
              padding: 5,
              marginBottom: 10,
              textAlign: 'center',
            }}
            value={verificationCode}
            onChangeText={handleVerificationCodeChange}
            placeholder="인증번호를 입력하세요"
            secureTextEntry
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={handleVerificationCodeSubmit}
              style={{
                backgroundColor: '#FFBDC1',
                paddingHorizontal: 15,
                padding: 7,
                borderRadius: 5,
                alignItems: 'center',
              }}
              disabled={isLoading}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                backgroundColor: '#a5a5a5',
                paddingHorizontal: 15,
                padding: 7,
                borderRadius: 5,
                alignItems: 'center',
              }}
              disabled={isLoading}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerificationModal;
