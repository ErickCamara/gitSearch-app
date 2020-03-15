import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 30px;

`;

export const InfoText = styled.View`
    align-items: center;
    margin: 25px;
`;
export const Name = styled.Text`
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 4px;
    text-align: justify;
`;
export const Bio = styled.Text`
    font-size: 13px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: left;

`;
