import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const Logo = styled.View`
    top: -15%;
    justify-content: flex-start;
    align-items: center;
`;
export const LogoImg = styled.Image`
    width: 200px;
    height: 200px;
`;
export const LogoText = styled.Image`
    margin-top: 10px;
`;
export const Body = styled.View`
    flex-direction: row;
`;
export const SubmitButton = styled(RectButton)`
    width: 150px;
    justify-content: center;
    align-items: center;
    background: #7159c1;
    border-radius: 10px;
    margin: 10px;
    padding: 0 12px 10px;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;
export const UserText = styled.Text.attrs({
    numberOfLines: 2,
})`
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`;
