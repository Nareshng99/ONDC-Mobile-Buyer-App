import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, withTheme} from 'react-native-paper';

/**
 * Component to display product details
 * @param item: object containing product details
 * @param theme:application theme
 * @constructor
 * @returns {JSX.Element}
 */
const Details = ({item, theme}) => {
  const {colors} = theme;

  const packageCommodity =
    item['@ondc/org/statutory_reqs_packaged_commodities'];

  const netQuantity = packageCommodity
    ? packageCommodity.net_quantity_or_measure_of_commodity_in_pkg
    : null;

  const manufacturingDate = packageCommodity
    ? packageCommodity.month_year_of_manufacture_packing_import
    : null;

  const country = packageCommodity
    ? packageCommodity.imported_product_country_of_origin
    : null;

  const manufactureName = packageCommodity
    ? packageCommodity.manufacturer_or_packer_name
    : null;

  return (
    <>
      <View style={[styles.container, styles.productDetailsContainer]}>
        <View style={styles.productDetailsTitleContainer}>
          {item.hasOwnProperty('@ondc/org/returnable') && (
            <Text style={[styles.title, {color: colors.gray}]}>Returnable</Text>
          )}
          {item.hasOwnProperty('@ondc/org/cancellable') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              Cancellable
            </Text>
          )}
          {item.hasOwnProperty('@ondc/org/available_on_cod') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              Cash On Delivery
            </Text>
          )}
          {item.hasOwnProperty('AvailableQuantity') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              Available Quantity
            </Text>
          )}
        </View>
        <View>
          {item.hasOwnProperty('@ondc/org/returnable') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              {item['@ondc/org/returnable'] ? 'Yes' : 'No'}
            </Text>
          )}
          {item.hasOwnProperty('@ondc/org/cancellable') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              {item['@ondc/org/cancellable']
                ? 'Yes'
                : 'No'}
            </Text>
          )}
          {item.hasOwnProperty('@ondc/org/available_on_cod') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              {item['@ondc/org/available_on_cod']
                ? 'Yes'
                : 'No'}
            </Text>
          )}
          {item.hasOwnProperty('AvailableQuantity') && (
            <Text style={[styles.title, {color: colors.gray}]}>
              {item.AvailableQuantity}
            </Text>
          )}
        </View>
      </View>
      {packageCommodity && (
        <View style={styles.container}>
          <Text style={[styles.heading, {color: colors.gray}]}>
            Product Details
          </Text>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetailsTitleContainer}>
              <>
                {manufactureName && (
                  <Text style={[styles.title, {color: colors.gray}]}>
                    Manufacture Name
                  </Text>
                )}
                {netQuantity && (
                  <Text style={[styles.title, {color: colors.gray}]}>
                    Net Quantity
                  </Text>
                )}

                {manufacturingDate && (
                  <Text style={[styles.title, {color: colors.gray}]}>
                    Manufacture Date
                  </Text>
                )}
                {country && (
                  <Text style={[styles.title, {color: colors.gray}]}>
                    Country of Origin
                  </Text>
                )}
              </>
            </View>
            <View>
              <>
                {manufactureName && (
                  <Text style={styles.value}>{manufactureName}</Text>
                )}
                {netQuantity && <Text style={styles.value}>{netQuantity}</Text>}
                {manufacturingDate && (
                  <Text style={styles.value}>{manufacturingDate}</Text>
                )}
                {country && <Text style={styles.value}>{country}</Text>}
              </>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default withTheme(Details);

const styles = StyleSheet.create({
  container: {padding: 10},
  heading: {fontSize: 18, fontWeight: '700', marginBottom: 8},
  productDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetailsTitleContainer: {marginRight: 20},
  title: {fontSize: 14, marginBottom: 4, flexShrink: 1},
  value: {fontSize: 14, marginBottom: 4, fontWeight: 'bold', flexShrink: 1},
  space: {margin: 10},
});
