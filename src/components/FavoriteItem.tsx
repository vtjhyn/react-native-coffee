import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface FavoriteItemProps {
  id: string;
  name: string;
  type: string;
  average_rating: number;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
  ingredients: string;
  ratings_count: string;
  roasted: string;
  description: string;
  favourite: boolean;
  toggleFavourite: any;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  id,
  name,
  type,
  average_rating,
  imagelink_portrait,
  special_ingredient,
  ingredients,
  ratings_count,
  roasted,
  description,
  favourite,
  toggleFavourite,
}) => {
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        enableBackHandler={false}
        imagelink={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        toggleFavourite={toggleFavourite}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientContainer}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  LinearGradientContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
