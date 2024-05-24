import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({navigation}: any) => {
  const orderHistoryList = useStore((state: any) => state.orderHistoryList);
  console.log(orderHistoryList[0]);

  const [showAnimation, setShowAnimation] = useState(false);

  const tabBarHeigh = useBottomTabBarHeight();

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {index, id, type});
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeigh}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />
            {orderHistoryList.length == 0 ? (
              <EmptyListAnimation title="No Order History" />
            ) : (
              <View style={styles.ListItemContainer}>
                {orderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    orderDate={data.orderDate}
                    cartListPrice={data.cartListPrice}
                    cartItems={data.cartList}
                  />
                ))}
              </View>
            )}
          </View>
          {orderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DonwloadButton}
              onPress={() => buttonPressHandler()}>
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    height: 250,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  DonwloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

export default OrderHistoryScreen;
