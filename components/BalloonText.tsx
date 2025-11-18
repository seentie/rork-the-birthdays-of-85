import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Ellipse, Line } from 'react-native-svg';

interface BalloonTextProps {
  text: string;
  color: string;
}

export function BalloonText({ text, color }: BalloonTextProps) {
  const words = text.split(' ');
  
  const balloonColors = [
    color,
    '#FF6B6B',
    '#4ECDC4',
    '#FFD93D',
    '#95E1D3',
    '#F38181',
    '#AA96DA',
    '#FCBAD3',
  ];
  
  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => (
        <View key={wordIndex} style={styles.wordContainer}>
          {word.split('').map((letter, letterIndex) => {
            const stringHeight = 40 + (Math.sin(letterIndex + wordIndex) * 15);
            const balloonColor = balloonColors[(letterIndex + wordIndex) % balloonColors.length];
            const sway = Math.sin(letterIndex + wordIndex) * 3;
            
            return (
              <View key={letterIndex} style={[styles.letterContainer, { transform: [{ translateX: sway }] }]}>
                <Svg 
                  height={stringHeight} 
                  width={60} 
                  style={styles.balloonSvg}
                >
                  <Ellipse
                    cx="30"
                    cy="35"
                    rx="26"
                    ry="32"
                    fill={balloonColor}
                    opacity={0.95}
                  />
                  <Ellipse
                    cx="22"
                    cy="28"
                    rx="8"
                    ry="10"
                    fill="rgba(255, 255, 255, 0.3)"
                  />
                  <Line
                    x1="30"
                    y1="67"
                    x2={30 + sway}
                    y2={stringHeight}
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <Ellipse
                    cx={30 + sway}
                    cy={stringHeight}
                    rx="3"
                    ry="5"
                    fill="#666"
                    opacity={0.6}
                  />
                </Svg>
                <Text
                  style={[
                    styles.balloonLetter,
                    {
                      color: '#FFFFFF',
                    },
                  ]}
                >
                  {letter.toUpperCase()}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    gap: 10,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  letterContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  balloonSvg: {
    position: 'relative',
  },
  balloonLetter: {
    fontSize: 24,
    fontWeight: '900' as const,
    fontFamily: 'monospace',
    position: 'absolute',
    top: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
