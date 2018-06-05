import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar, Button, Spinner } from '../../../components'
import Style from '../../../style/defaultStyle'
import { API_CALL } from '../../../utils/ajaxRequestHelper'
import TopicItem from './components/topicItem'

class ThreadTopic extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      // checkbox categories used to render the checkbox  and save the
      // checked status of the list
      categories: [],
      pagination: {
        limit: 0,
        page: 0,
        pages: 0,
        total: 0
      }
    }

    this.onCheckHandler = this.onCheckHandler.bind(this)
    this.saveSelectedCategory = this.saveSelectedCategory.bind(this)
  }

  async fetchTopics() {
    this.setState({
      isLoading: true
    })

    const option = {
      method: 'get',
      url: '/api/categories?limit=100',
    };

    try {
      const { data: { data : { categories: { docs, ...pagination }}} } = await API_CALL(option);

      this.setState({
        categories: this.mapCategories(docs),
        isLoading: false,
        isError: false,
        pagination
      })
    } catch (error) {
      console.log(error)
    }
  }

  mapCategories(categories) {
    return categories.map(item => ({
      label: item.category,
      _id: item._id,
      isChecked: this.props.userCurrentCategories.includes(item._id)
    }))
  }

  onCheckHandler(index) {
    const mutate = this.state.categories;
    mutate[index].isChecked = !mutate[index].isChecked
    this.setState({
      categories: mutate
    })
  }

  componentDidMount() {
    this.fetchTopics()
  }

  async saveSelectedCategory(cb) {
    this.setState({
      isLoading: true
    })

    let threadCategoryPreferences = []
    this.state.categories.forEach(item => {
      if(item.isChecked) {
        threadCategoryPreferences.push(item._id)
      }
    })

    if (threadCategoryPreferences.length > 0 && this.state.categories.length > 0) {
      this.setState({
        isError: false
      })

      const option = {
        method: 'put',
        url: `/api/users/${this.props.currentUserId}`,
        data: {
          threadCategoryPreferences
        }
      };

      try {
        const { data: { data: {user} }} = await API_CALL(option);
        this.props.dispatch({
          type: 'GET_CURRENT_USER',
          payload: user
        })

      } catch (error) {
        console.log(error)
      }
    } else {
      this.setState({
        isError: true
      })
    }


    this.setState({
      isLoading: false
    })

    if (cb) cb()
  }

  render() {
    let { header, onSubmitButton } = this.props
    header = header || (
      <NavigationBar onPress={() => this.props.navigator.pop()} title="PILIH TOPIK FORUM" />
    )
    return (
      <View style={styles.container}>
        {
          this.state.isLoading &&
          <Spinner color="#EF434F" text="" size="large" />
        }
        { header }
        <ScrollView>
          <View style={styles.checkboxContainer}>
            {
              this.state.categories.map( (item, index) => (
                <TopicItem
                  key={index}
                  data={item}
                  index={index}
                  onChange={this.onCheckHandler}/>
              ))
            }
          </View>
        </ScrollView>
        {
          this.state.isError &&
          <Text style={styles.errorText}>Minimal pilihan topik thread adalah 1</Text>
        }
        <Button
          textStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={() => {this.saveSelectedCategory(onSubmitButton)}}>
          <Text>
            SIMPAN
          </Text>
        </Button>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  checkboxContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    marginTop: 10
  },
  buttonText: {
    fontSize: 13
  }
}

const mapStateToProps = state => ({
	currentUserId: state.authReducer.currentUser._id,
	userCurrentCategories: state.authReducer.currentUser.threadCategoryPreferences,
});

export default connect(mapStateToProps)(ThreadTopic)
