// SlideAnimation.tsx
import React, { useRef } from 'react';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

interface SlideAnimationProps {
 children: React.ReactNode;
 onSwipeLeft: () => void;
 onSwipeRight: () => void;
}

const SlideAnimation: React.FC<SlideAnimationProps> = ({ children, onSwipeLeft, onSwipeRight }) => {
 const position = useRef(new Animated.ValueXY()).current;

 const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState: PanResponderGestureState) => {
      const { dx } = gestureState;
      let direction: 'left' | 'right' = 'right'; // Initialize with a default value

      if (Math.abs(dx) > 0) {
        direction = dx > 0 ? 'right' : 'left';
      }

      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();

      switch (direction) {
        case 'left':
          onSwipeLeft();
          break;
        case 'right':
          onSwipeRight();
          break;
      }
    },
 });

 return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: position.getTranslateTransform(),
      }}
    >
      {children}
    </Animated.View>
 );
};

export default SlideAnimation;
