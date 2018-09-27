import React from 'react';
import { debounce } from 'lodash';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, Platform } from 'react-native';
import Style from '../../../../style/defaultStyle';
import color from '../../../../style/color';

const InsuranceList = ({ data, onDeleteItem, onUpdateItem, getInsurance, navigator }) => {
  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.textLabel}>Asuransi</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.text}>:</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={styles.textLabel}>Tipe Asuransi</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.text}>:</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.text}>{item.type}</Text>
          </View>
        </View>
      </View>
      {(item.type === 'perusahaan' || item.type === 'Perusahaan') && (
        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={styles.textLabel}>No Asuransi</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.text}>:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.text}>{item.insuranceNumber}</Text>
            </View>
          </View>
        </View>
      )}
      {item.policyNumber !== '' && (
        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={styles.textLabel}>No Polis</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.text}>:</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.text}>{item.policyNumber}</Text>
            </View>
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onDeleteItem(item._id, index);
          }}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Image
              source={require('../../../../assets/icons/delete.png')}
              style={{
                height: 20,
                width: 20,
                marginRight: 10
              }}
            />
            <Text>Delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onUpdateItem(item._id);
          }}
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Image
              source={require('../../../../assets/icons/edit.png')}
              style={{
                height: 20,
                width: 20,
                marginRight: 10
              }}
            />
            <Text>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const footer = data => (
    <View
      style={{
        marginVertical: 15,
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        onPress={debounce(() => {
          data.length === 10
            ? Alert.alert('Anda sudah memiliki 10 Asuransi.')
            : navigator.push({
                screen: 'TemanDiabetes.CreateAsuransi',
                navigatorStyle: {
                  navBarHidden: true,
                  tabBarHidden: true
                },
                passProps: {
                  onSuccessCallback: () => {
                    getInsurance();
                  }
                }
              });
        },
        500,
        {
          leading: true,
          trailing: false
        })}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 155,
          height: 34,
          backgroundColor: '#ef434e',
          borderRadius: 3
        }}
      >
        <Text style={{ color: '#fff', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans', textAlign: 'center' }}>
          TAMBAH ASURANSI
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList data={data} renderItem={renderItem} ListFooterComponent={footer(data)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: Style.PADDING - 3,
    marginRight: Style.PADDING - 3,
    backgroundColor: '#fff',
    elevation: 3
  },
  content: {
    padding: Style.PADDING,
    marginLeft: 0,
    marginRight: 0
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  label: {},
  text: {
    textAlign: 'left'
  },
  textLabel: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Style.PADDING + 10,
    paddingRight: Style.PADDING + 10,
    paddingTop: Style.PADDING - 10,
    paddingBottom: Style.PADDING - 10,
    backgroundColor: color.solid
  }
});

export default InsuranceList;
