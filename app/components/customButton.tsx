import React, {ReactDOM} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

interface BtnProp {
  onPressFunction: () => void;
  color?: string;
  title?: string;
  style?: any;
  titleStyle?: any;
  Coponents?: React.ReactNode;
  disabled?: boolean;
}

const CustomButton = ({
  onPressFunction,
  color,
  style,
  titleStyle,
  title,
  Coponents,
  disabled,
}: BtnProp) => {
  return (
    <Pressable
      onPress={onPressFunction}
      disabled={disabled || false}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      android_ripple={{color: '#ddd'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#ddd' : color},
        styles.button,
        {...style},
      ]}>
      {Coponents}
      {title && <Text style={[styles.title, {...titleStyle}]}>{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
  },
  button: {},
});

export default CustomButton;
