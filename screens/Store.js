import { Text, View } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'

import MasonryList from '@react-native-seoul/masonry-list';

import env from '../constants/env'
import Header from '../components/Header'
import { styles, COLORS } from '../constants/style'
import ProductArchive from '../components/archive/Product'

export class Store extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prod: [],
      numberposts: 10,
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
      numberposts: 10,
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
      <View style={[styles.h_100, styles.bg_secondary]}>
        <Header {...this.props} />
        {
          prod && prod.length >= 1
            ? <MasonryList
              data={prod}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={(product, index) => <ProductArchive key={index} item={product} {...this.props} />}
              refreshing={!isLoaded}
              onRefresh={() => this.defaultSettingsSetup()}
              onEndReached={() => hasMore && !loadingMore ? this.handleLoadMoreResults() : null}
            />
            : (isLoaded ? <Text>No products</Text> : null)
        }

        {loadingMore ? <Text style={{ color: COLORS.white }}>loading...</Text> : null}
      </View >
    )
  }
}

export default Store