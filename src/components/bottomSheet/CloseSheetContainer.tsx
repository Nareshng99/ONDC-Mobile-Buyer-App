import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {useAppTheme} from '../../utils/theme';

const CloseSheetContainer = ({
  closeSheet,
  children,
}: {
  closeSheet: () => void;
  children: any;
}) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View style={styles.container}>
      <View style={styles.closeSheet}>
        <TouchableOpacity onPress={closeSheet} style={styles.closeButton}>
          <Icon name={'clear'} color={theme.colors.white} size={36} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      height: Dimensions.get('screen').height,
      paddingBottom: 70,
    },
    closeSheet: {
      alignItems: 'center',
      paddingBottom: 8,
      paddingTop: 20,
    },
    closeButton: {
      width: 36,
      height: 36,
      backgroundColor: colors.neutral400,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CloseSheetContainer;
