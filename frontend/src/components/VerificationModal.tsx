import {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, TextInput} from 'react-native';

export type VerificationModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const VerificationModal = ({isVisible, onClose}: VerificationModalProps) => {
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleVerificationCodeChange = (text: string) => {
    setVerificationCode(text);
  };

  const handleVerificationCodeSubmit = () => {
    // handle verification code submit logic here
    onClose();
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
              }}>
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
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerificationModal;
