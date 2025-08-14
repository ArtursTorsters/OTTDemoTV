/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationScreens, MovieItem } from '../types';
import { useCatalog } from '../hooks/useCatalog';
import CatalogTile from '../components/catalog/CatalogTile';
import LoadingState from '../components/state/LoadingState';
import ErrorState from '../components/state/ErrorState';
import { homeStyle as styles } from '../styles/HomeScreenStyles';
import { colors } from '../styles/theme';

type Props = NativeStackScreenProps<NavigationScreens, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { data, error, loading } = useCatalog();

  const handleItemPress = (item: MovieItem) => {
    navigation.navigate('Details', { item });
  };

  const renderMovieItem = ({ item, index }: { item: MovieItem; index: number }) => (
    <CatalogTile
      item={item}
      onPress={handleItemPress}
      index={index}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>OTT Demo</Text>
      <Text style={styles.subtitle}>
        {data?.items?.length} movies available
      </Text>
    </View>
  );

  if (loading) {
    return <LoadingState message="Loading movies..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data?.items?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        {renderHeader()}
        <Text style={styles.emptyMessage}>No movies to display</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {renderHeader()}

      <FlatList
        data={data.items}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingHorizontal: 16
        }}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: 20
        }}
        removeClippedSubviews={false}
        initialNumToRender={9}
        maxToRenderPerBatch={9}
        windowSize={5}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        {...(Platform.isTV && {
          directionalLockEnabled: false,
        })}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
