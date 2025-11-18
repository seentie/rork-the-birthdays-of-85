import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface BalloonTextProps {
  text: string;
  color: string;
}

export function BalloonText({ text, color }: BalloonTextProps) {
  const letters = text.split('');
  
  return (
    <View style={styles.container}>
      {letters.map((letter, index) => {
        const stringHeight = 30 + Math.random() * 20;
        const wobble = Math.sin(index) * 2;
        
        return (
          <View key={index} style={styles.letterContainer}>
            <Svg 
              height={stringHeight} 
              width={2} 
              style={[styles.string, { marginLeft: wobble }]}
            >
              <Path
                d={`M 1 0 Q ${1 + wobble} ${stringHeight / 2} 1 ${stringHeight}`}
                stroke={color}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </Svg>
            <Text
              style={[
                styles.balloonLetter,
                {
                  color: color,
                  textShadowColor: 'rgba(255, 255, 255, 0.9)',
                  textShadowOffset: { width: 0, height: 5 },
                  textShadowRadius: 0,
                  transform: [{ translateX: wobble }],
                },
              ]}
            >
              {letter}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 40,
  },
  letterContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  string: {
    position: 'absolute',
    top: -30,
  },
  balloonLetter: {
    fontSize: 42,
    fontWeight: '900' as const,
    fontFamily: 'monospace',
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
  },
});
