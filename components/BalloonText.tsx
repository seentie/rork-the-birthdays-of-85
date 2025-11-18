import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Ellipse, Line } from 'react-native-svg';

interface BalloonTextProps {
  text: string;
  color: string;
}

const getBalloonPath = (letter: string): string => {
  const paths: { [key: string]: string } = {
    'T': 'M15,25 Q15,10 30,10 Q45,10 45,25 Q45,40 40,50 L40,55 Q40,60 30,60 Q20,60 20,55 L20,50 Q15,40 15,25 M20,15 L40,15 M30,15 L30,50',
    'H': 'M15,10 L15,60 M15,35 L45,35 M45,10 L45,60',
    'E': 'M15,10 L45,10 M15,10 L15,60 M15,35 L40,35 M15,60 L45,60',
    'B': 'M15,10 L15,60 M15,10 Q40,10 40,25 Q40,35 15,35 Q45,35 45,47.5 Q45,60 15,60',
    'I': 'M25,10 L35,10 M30,10 L30,60 M25,60 L35,60',
    'R': 'M15,10 L15,60 M15,10 Q45,10 45,25 Q45,35 15,35 L45,60',
    'D': 'M15,10 L15,60 M15,10 Q50,10 50,35 Q50,60 15,60',
    'A': 'M15,60 L30,10 L45,60 M20,40 L40,40',
    'Y': 'M15,10 L30,35 L30,60 M45,10 L30,35',
    'S': 'M45,15 Q45,10 35,10 Q15,10 15,20 Q15,30 30,32 Q45,34 45,45 Q45,60 25,60 Q15,60 15,55',
    'O': 'M30,10 Q15,10 15,35 Q15,60 30,60 Q45,60 45,35 Q45,10 30,10',
    'F': 'M15,10 L45,10 M15,10 L15,60 M15,35 L40,35',
    "'": 'M28,10 L32,10 L30,20',
    '8': 'M30,10 Q15,10 15,20 Q15,30 30,32 Q45,34 45,45 Q45,60 30,60 Q15,60 15,45 Q15,34 30,32 Q45,30 45,20 Q45,10 30,10',
    '5': 'M45,10 L15,10 L15,32 L30,32 Q45,32 45,46 Q45,60 30,60 Q15,60 15,55',
    'N': 'M15,60 L15,10 L45,60 L45,10',
    'W': 'M10,10 L18,60 L30,35 L42,60 L50,10',
    'G': 'M45,25 L45,60 Q45,60 30,60 Q15,60 15,35 Q15,10 30,10 Q45,10 45,20 M35,40 L45,40',
    'L': 'M15,10 L15,60 L45,60',
    'M': 'M15,60 L15,10 L30,30 L45,10 L45,60',
    'P': 'M15,60 L15,10 Q45,10 45,25 Q45,37 15,37',
    'C': 'M45,20 Q45,10 30,10 Q15,10 15,35 Q15,60 30,60 Q45,60 45,50',
    'U': 'M15,10 L15,50 Q15,60 30,60 Q45,60 45,50 L45,10',
    'V': 'M15,10 L30,60 L45,10',
    'K': 'M15,10 L15,60 M45,10 L15,35 L45,60',
    'X': 'M15,10 L45,60 M45,10 L15,60',
    'Z': 'M15,10 L45,10 L15,60 L45,60',
    'J': 'M35,10 L35,50 Q35,60 25,60 Q15,60 15,55',
    'Q': 'M30,10 Q15,10 15,35 Q15,60 30,60 Q45,60 45,35 Q45,10 30,10 M38,52 L48,65',
  };
  return paths[letter.toUpperCase()] || paths['O'];
};

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
                    cx="31"
                    cy="37"
                    rx="26"
                    ry="32"
                    fill="rgba(0, 0, 0, 0.15)"
                  />
                  <Ellipse
                    cx="30"
                    cy="35"
                    rx="26"
                    ry="32"
                    fill={balloonColor}
                    opacity={0.95}
                  />
                  <Ellipse
                    cx="20"
                    cy="25"
                    rx="10"
                    ry="12"
                    fill="rgba(255, 255, 255, 0.4)"
                  />
                  <Ellipse
                    cx="38"
                    cy="45"
                    rx="5"
                    ry="7"
                    fill="rgba(0, 0, 0, 0.1)"
                  />
                  <Path
                    d={getBalloonPath(letter)}
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M28,67 Q30,70 32,67"
                    fill={balloonColor}
                    stroke={balloonColor}
                    strokeWidth="1"
                  />
                  <Line
                    x1="30"
                    y1="70"
                    x2={30 + sway}
                    y2={stringHeight - 5}
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <Ellipse
                    cx={30 + sway}
                    cy={stringHeight - 3}
                    rx="4"
                    ry="6"
                    fill="#666"
                    opacity={0.7}
                  />
                </Svg>
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
});
