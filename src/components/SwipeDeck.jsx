import React, { useState, useRef, useLayoutEffect } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35

export default ({ data, renderCard, onSwipeRight, onSwipeLeft, renderNoMoreCards }) => {

  const [, setIndex] = useState(0)
  const indexRef = useRef(0)

  useLayoutEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  })

  const resetPosition = () => {
    Animated.spring(cardPosition, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start()
  }

  const forceSwipe = (direction) => {
    Animated.timing(cardPosition, {
      toValue: {
        x: (direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH),
        y: 0
      },
      duration: 250,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction))
  }
  
  const onSwipeComplete = (direction) => {
    const item = data[indexRef.current]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    cardPosition.setValue({ x: 0, y: 0 })
    
    indexRef.current = indexRef.current + 1
    setIndex(indexRef.current)
  }

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      cardPosition.setValue({ x: gesture.dx, y: gesture.dy })
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right')
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left')
      } else {
        resetPosition()
      }
    },
  })).current

  const cardPosition = useRef(new Animated.ValueXY()).current

  const getCardStyle = () => {
    const rotate = cardPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-90deg', '0deg', '90deg']
    })
    return {
      ...cardPosition.getLayout(),
      transform: [{ rotate }]
    }
  }

  const renderedData = indexRef.current >= data?.length ?
    renderNoMoreCards() :
    data.map((cardData, i) => {
      if (indexRef.current > i) {
        return null
      }
      if (i === indexRef.current) {
        return (
          <Animated.View
            key={cardData.id}
            style={ [getCardStyle(), styles.cardStyle] }
            {...panResponder.panHandlers}
          >
            {renderCard(cardData)}
          </Animated.View>
        )
      }
      return (
        <Animated.View
          key={cardData.id}
          style={[styles.cardStyle, { top: 3 * (i - indexRef.current), left: 2 * (i - indexRef.current) }]}>
          {renderCard(cardData)}
        </Animated.View>
      )
    }).reverse()

  return (
    <View>
      {renderedData}
    </View>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
});