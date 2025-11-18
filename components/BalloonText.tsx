import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Ellipse, Line, Path } from 'react-native-svg';

interface BalloonTextProps {
  text: string;
  color: string;
}

export function BalloonText({ text, color }: BalloonTextProps) {
  const words = text.split(' ');
  
  const balloonColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#FFE66D',
    '#A8E6CF',
    '#FF8B94',
    '#B4A7D6',
    '#FFD3B6',
    '#95E1D3',
  ];
  
  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => (
        <View key={wordIndex} style={styles.wordContainer}>
          {word.split('').map((letter, letterIndex) => {
            const balloonColor = balloonColors[(letterIndex + wordIndex) % balloonColors.length];
            const sway = Math.sin((letterIndex + wordIndex) * 0.5) * 3;
            const rotation = Math.sin((letterIndex + wordIndex) * 0.4) * 5;
            
            return (
              <View 
                key={letterIndex} 
                style={[
                  styles.letterContainer,
                  { transform: [{ translateX: sway }, { rotate: `${rotation}deg` }] }
                ]}
              >
                <Svg 
                  height={150} 
                  width={55}
                  style={styles.balloonSvg}
                >
                  <Ellipse
                    cx="28"
                    cy="38"
                    rx="24"
                    ry="32"
                    fill="rgba(0, 0, 0, 0.1)"
                  />
                  
                  <Ellipse
                    cx="27"
                    cy="35"
                    rx="24"
                    ry="32"
                    fill={balloonColor}
                  />
                  
                  <Ellipse
                    cx="18"
                    cy="25"
                    rx="9"
                    ry="12"
                    fill="rgba(255, 255, 255, 0.4)"
                  />
                  
                  <Ellipse
                    cx="34"
                    cy="44"
                    rx="5"
                    ry="8"
                    fill="rgba(0, 0, 0, 0.1)"
                  />
                  
                  <Path
                    d="M24,67 Q27,70 30,67"
                    fill={balloonColor}
                    stroke={balloonColor}
                    strokeWidth="2"
                  />
                  
                  <Line
                    x1="27"
                    y1="70"
                    x2="27"
                    y2="140"
                    stroke="rgba(100, 100, 100, 0.5)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </Svg>
                
                <Text 
                  style={[
                    styles.balloonLetter,
                    { 
                      color: '#FFFFFF',
                      textShadowColor: 'rgba(0, 0, 0, 0.3)',
                      textShadowOffset: { width: 1, height: 2 },
                      textShadowRadius: 4,
                    }
                  ]}
                >
                  {letter}
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 5,
    gap: 8,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: -8,
  },
  letterContainer: {
    width: 55,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  balloonSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  balloonLetter: {
    fontSize: 26,
    fontWeight: '900' as const,
    position: 'absolute',
    top: 18,
    textAlign: 'center',
    zIndex: 2,
  },
});
