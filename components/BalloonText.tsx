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
    '#D4A5A5',
  ];
  
  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => (
        <View key={wordIndex} style={styles.wordContainer}>
          {word.split('').map((letter, letterIndex) => {
            const stringHeight = 60 + (Math.sin((letterIndex + wordIndex) * 0.7) * 20);
            const balloonColor = balloonColors[(letterIndex + wordIndex) % balloonColors.length];
            const sway = Math.sin((letterIndex + wordIndex) * 0.5) * 5;
            const rotation = Math.sin((letterIndex + wordIndex) * 0.3) * 8;
            
            return (
              <View 
                key={letterIndex} 
                style={[
                  styles.letterContainer,
                  { transform: [{ translateX: sway }] }
                ]}
              >
                <Svg 
                  height={stringHeight + 90} 
                  width={70}
                  style={[styles.balloonSvg, { transform: [{ rotate: `${rotation}deg` }] }]}
                >
                  <Ellipse
                    cx="36"
                    cy="52"
                    rx="32"
                    ry="42"
                    fill="rgba(0, 0, 0, 0.12)"
                  />
                  
                  <Ellipse
                    cx="35"
                    cy="48"
                    rx="32"
                    ry="42"
                    fill={balloonColor}
                  />
                  
                  <Ellipse
                    cx="23"
                    cy="34"
                    rx="12"
                    ry="16"
                    fill="rgba(255, 255, 255, 0.5)"
                  />
                  
                  <Ellipse
                    cx="43"
                    cy="58"
                    rx="7"
                    ry="10"
                    fill="rgba(0, 0, 0, 0.08)"
                  />
                  
                  <Path
                    d="M32,90 Q35,93 38,90"
                    fill={balloonColor}
                    stroke={balloonColor}
                    strokeWidth="2"
                  />
                  
                  <Line
                    x1="35"
                    y1="93"
                    x2={35 + (sway * 0.3)}
                    y2={stringHeight + 80}
                    stroke="rgba(100, 100, 100, 0.6)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  
                  <Ellipse
                    cx={35 + (sway * 0.3)}
                    cy={stringHeight + 80}
                    rx="3"
                    ry="4"
                    fill="rgba(80, 80, 80, 0.5)"
                  />
                </Svg>
                
                <Text 
                  style={[
                    styles.balloonLetter,
                    { 
                      color: '#FFFFFF',
                      textShadowColor: 'rgba(0, 0, 0, 0.25)',
                      textShadowOffset: { width: 1, height: 2 },
                      textShadowRadius: 3,
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    gap: 15,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: -5,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  balloonSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  balloonLetter: {
    fontSize: 32,
    fontWeight: '900' as const,
    position: 'absolute',
    top: 25,
    textAlign: 'center',
  },
});
