import React, { Text, ScrollView, StyleSheet, View, Dimensions, Pressable } from "react-native"

const SCREEN_WIDTH = Dimensions.get('window').width

const Slides = ({ slides, onFinish }) => {

  const renderSlide = () => {
    return slides.map((slide, index) => (
      <View
        key={slide.text}
        style={[styles.slide, { backgroundColor:slide.color }] }
      >
        <Text style={styles.slideText} >
          {slide.text}
        </Text>

        { slides.length === index + 1 && 
          <Pressable style={styles.button} onPress={onFinish}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </Pressable>
        }
        
      </View>
    ))
  }
  return (
    <ScrollView
      horizontal
      pagingEnabled
      style={{ flex: 1 }}
    >
      {renderSlide()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#009688',
    marginTop: 50
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  slideText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  }
})

export default Slides