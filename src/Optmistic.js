import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeModules
} from 'react-native';

const style = [
  {
    backgroundColor: 'blue'
  },
  {
    backgroundColor: 'black'
  },
  {
    backgroundColor: 'green'
  }
];

export default class OptmisticList extends Component {
  constructor(props) {
    super(props);

    this.data = [{
      name: '1',
      num: 1,
      height: 160,
      width: Dimensions.get('window').width
    },
    {
      name: '2',
      num: 2,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '3',
      num: 3,
      height: 500,
      width: Dimensions.get('window').width
    },
    {
      name: '4',
      num: 4,
      height: 300,
      width: Dimensions.get('window').width
    },
    {
      name: '5',
      num: 5,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '6',
      num: 6,
      height: 500,
      width: Dimensions.get('window').width
    },
    {
      name: '7',
      num: 7,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '8',
      num: 8,
      height: 300,
      width: Dimensions.get('window').width
    },
    {
      name: '9',
      num: 9,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '10',
      num: 10,
      height: 400,
      width: Dimensions.get('window').width
    },
    {
      name: '11',
      num: 11,
      height: 160,
      width: Dimensions.get('window').width
    },
    {
      name: '12',
      num: 12,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '13',
      num: 13,
      height: 500,
      width: Dimensions.get('window').width
    },
    {
      name: '14',
      num: 14,
      height: 300,
      width: Dimensions.get('window').width
    },
    {
      name: '15',
      num: 15,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '16',
      num: 16,
      height: 500,
      width: Dimensions.get('window').width
    },
    {
      name: '17',
      num: 17,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '18',
      num: 18,
      height: 300,
      width: Dimensions.get('window').width
    },
    {
      name: '19',
      num: 19,
      height: 200,
      width: Dimensions.get('window').width
    },
    {
      name: '20',
      num: 20,
      height: 400,
      width: Dimensions.get('window').width
    }];

    // Define because use in method generatedViews
    this.state = {
      first: 0,
      last: 9,
    };

    // Generate the views
    const views = this.generateViews();

    // Finish load the state
    this.state = {
      ...this.state,
      lastOffSet: {
        x: 0,
        y: 0
      },
      views: views?.items,
      scrollSize: views?.totalSize
    };
    // Layout of views
    this.layoutViews = new Array(9);

    // Moving triggers
    this.moving = 'down';
  }

  // This method detect the direction of moving
  onScroll = (event) => {
    this.moving = this.detectMovimentDirection(event);
    // console.warn(this.moving);
  }

  // Gera a lista com os itens atualizados
  generateViews = () => {
    let items;
    let totalSize;

    items = [];

    for (let i = 0; i < 9; i += 1) {
      items.push(this.renderItem(this.data[this.state.first + i], i));
      totalSize += this.data[this.state.first + i].height;
    }

    return { items, totalSize };
  }

  // This detect direction of moviment
  detectMovimentDirection = (event) => {
    let result;

    if (event.contentOffset.y > this.state.lastOffSet.y) {
      result = 'down';
    } else {
      result = 'up';
    }

    this.setState({
      lastOffSet: {
        x: event.contentOffset.x,
        y: event.contentOffset.y
      }
    });

    return result;
  }

  // This method find the current id in screen
  getCurrentViewportItem = (event) => {
    // Take a offset diference betwen views and scrollview
    const diffs = this.layoutViews.map((item) => {
      // const percent =
      //       item.layout.height > Dimensions.get('window').height * 1.3 ?
      //         0.8 :
      //         item.layout.height > Dimensions.get('window').height * 0.7 ?
      //           0.6 :
      //           item.layout.height > Dimensions.get('window').height * 0.5 ?
      //             0.5 :
      //             0;

      // const itemOffset = (item.layout.y + (item.layout.height * percent));
      // // If the view has passed
      if (item.layout.y < event.contentOffset.y) {
        return 10000;
      }
      return (item.layout.y - event.contentOffset.y);
    });
    const min = Math.min.apply(null, diffs);
    return diffs.findIndex(item => item === min);
  }


  // This method observe the scrolling
  onScrollEnd = (event) => {
    const id = this.getCurrentViewportItem(event);
    console.warn(id);
    console.warn(this.layoutViews);

    // Now we reoganize the itens if has the conditions
    if (id <= 2 && this.moving === 'up') {
      this.updateItems(2 - id, this.moving);
    } else if (id >= 6 && this.moving === 'down') {
      this.updateItems(6 - id, this.moving);
    }
  }

  // This method update the list itens
  updateItems = (numItems, direction) => {
    const newItens = this.selectItensToRender(numItems, direction);
    console.warn('kk', this.state.first);
    // if (newItens?.length > 0) {
    // this.removeOlderElementsFromList(newItens.length, direction);

    if (direction === 'up') {
      // RENDER ITENS AND MAKE SET STATE
      // GO TO THE CORRETY HEIGHT
    } else {
      console.warn('Here');
      const newviews = this.generateViews();

      this.setState({ views: newviews.items, totalSize: newviews.totalSize });
      // console.warn(this.state.views);
      // console.warn(newItens);

      // RENDER ITENS AND MAKE SET STATE
      // GO TO THE CORRETY HEIGHT
    }
    // } else {
    //   // RENDER NOTHING
    // }
  }

  // This function will select itens to render
  selectItensToRender = (numItems, direction) => {
    const { last, first } = this.state;
    let result;
    let lastUpdated;
    let firstUpdated;

    if (direction === 'up') {
      // if(first > 0) {}
    }

    if (direction === 'down') {
      let n; // number of itens to render

      // check and determine 'n'
      if ((last + numItems) < this.data.length - 1) {
        n = numItems;
      } else {
        // if() {

        // } else if () {

        // } else if () {

        // }
      }

      result = [];
      for (let i = 0; i < n; i += 1) {
        result.push(this.data[last + i]);
      }

      lastUpdated = n + last;
      firstUpdated = n + first;
    }

    this.setState({
      last: lastUpdated,
      first: firstUpdated
    });

    return result;
  }

  // This method remove the older views who are not visible
  removeOlderElementsFromList = (length, direction) => {
    const { views, totalSize } = this.state;
    let viewsUpdated;
    let totalSizeUpdated;

    // eslint-disable-next-line prefer-const
    viewsUpdated = views;
    totalSizeUpdated = totalSize;

    if (direction === 'up') {
      for (let i = 0; i < length; i += 1) {
        const item = viewsUpdated.shift();
        this.layoutViews.shift();
        totalSizeUpdated -= item.height;
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        const item = viewsUpdated.pop();
        this.layoutViews.pop();
        totalSizeUpdated -= item.height;
      }
    }

    this.setState({ views: viewsUpdated, totalSize: totalSizeUpdated });
  }

  renderItem(item, index) {
    return (
      <View 
        onChange={inView => console.log('Inview: '+ inView)}
        key={item.num + item.name + index}
        onLayout={(e) => { this.layoutViews[index] = e.nativeEvent; }}
        style={{ height: item.height, ...style[Math.floor(Math.random() * (3))] }}
      >
        <Text style={{ color: 'yellow', fontSize: 20 }}>{item.name}</Text>
      </View>
    );
  }


  render() {
    return (
      <ScrollView
        ref={(c) => { this.ScrollView = c; }}
        decelerationRate={0.5}
        onScroll={event => this.onScroll(event.nativeEvent)}
        onScrollEndDrag={event => this.onScrollEnd(event.nativeEvent)}
        // onMomentumScrollEnd={event => this.onScrollEnd(event.nativeEvent)}
        contentContainerStyle={{
          height: this.state.scrollSize,
          paddingBottom: 20,
          paddingTop: 10,
          backgroundColor: 'red',
          flexDirection: 'column'
        }}
      >
        {this.state.views.map(item => item)}
      </ScrollView>
    );
  }
}
