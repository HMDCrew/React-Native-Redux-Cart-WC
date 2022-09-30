import { FlatList, RefreshControl, ScrollView, SafeAreaView, Text, View, VirtualizedList } from 'react-native'
import React, { Component } from 'react'
import { Stack, ActivityIndicator } from "@react-native-material/core"
import axios from 'axios'

import env from '../constants/env'
import Header from '../components/Header'
import { styles, COLORS } from '../constants/style'
import ProductArchive from '../components/archive/Product'

export class Store extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prod: [],
      numberposts: 5,
      page: 1,
      isLoaded: false,
      hasMore: true,
      loadingMore: false,
    }
  }

  async requestApi(request, incremental = false) {

    const { prod, numberposts, page, loadingMore } = this.state;

    try {
      let response = await axios.post(env.SITE_URL + "wp-json/wpr-get-products", request)
      let data = await response.data;

      if ('error' !== data.status) {
        this.setState({
          prod: (incremental ? [...prod, ...data.message] : data.message),
          page: (incremental ? page + 1 : page),
          hasMore: (data.message.length >= numberposts ? true : false),
          loadingMore: (incremental ? false : loadingMore),
          isLoaded: true,
        })
      } else {
        if ("there isn't products" === data.message) {
          this.setState({
            hasMore: false,
            loadingMore: false,
          })
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  defaultSettingsSetup() {

    const { params } = this.props.route;
    const { numberposts, page } = this.state;

    this.setState({
      prod: [],
      numberposts: 5,
      page: 1,
      isLoaded: false,
      hasMore: true,
      loadingMore: false,
    }, () => {

      this.requestApi({
        numberposts: numberposts,
        page: page,
        category: JSON.stringify(params.term)
      });

    });
  }

  componentDidMount() {
    this.defaultSettingsSetup();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const { params } = this.props.route;
    const oldParms = prevProps.route.params;

    if (params && oldParms && params.term.slug !== oldParms.term.slug) {
      this.defaultSettingsSetup();
    }
  }

  handleLoadMoreResults() {

    this.setState({ loadingMore: true })

    const { numberposts, page } = this.state;
    const { params } = this.props.route;

    this.requestApi({
      numberposts: numberposts,
      page: page + 1,
      category: JSON.stringify(params.term)
    }, true);
  }

  render() {

    const { prod, isLoaded, hasMore, loadingMore } = this.state;

    return (
      <View style={styles.h_100}>
        <Header {...this.props} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={!isLoaded}
              onRefresh={() => this.defaultSettingsSetup()}
            />
          }
          onMomentumScrollEnd={(event) => {
            hasMore && !loadingMore ? this.handleLoadMoreResults() : null
          }}
        >
          {
            prod && prod.length >= 1 ?
              prod.map((product, index) => <ProductArchive key={index} item={product} {...this.props} />)
              :
              (isLoaded ? <Text>No products</Text> : null)
          }

          {loadingMore ? <Text>loading...</Text> : null}
        </ScrollView>
      </View >
    )
  }
}

export default Store