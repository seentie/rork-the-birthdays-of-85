import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';

interface BalloonTextProps {
  text: string;
  color: string;
}

export function BalloonText({ text, color }: BalloonTextProps) {
  const balloonColors = [
    '#FF6B8E',
    '#6BDBFF',
    '#FFE66D',
    '#A8E6CF',
    '#FF8BA7',
    '#B4A7D6',
    '#FFD3A5',
    '#95E1D3',
  ];
  
  const characters = text.split('');
  
  return (
    <View style={styles.container}>
      <View style={styles.balloonsWrapper}>
        {characters.map((char, index) => {
          if (char === ' ') {
            return <View key={index} style={styles.spacer} />;
          }
          
          const balloonColor = balloonColors[index % balloonColors.length];
          const sway = Math.sin(index * 0.7) * 8;
          const yOffset = Math.cos(index * 0.5) * 15;
          const rotation = Math.sin(index * 0.6) * 6;
          const stringLength = 80 + Math.sin(index * 0.8) * 25;
          
          return (
            <View 
              key={index} 
              style={[
                styles.balloonContainer,
                { 
                  transform: [
                    { translateX: sway },
                    { translateY: yOffset },
                    { rotate: `${rotation}deg` }
                  ] 
                }
              ]}
            >
              <Svg 
                height={120 + stringLength} 
                width={70}
                style={styles.balloonSvg}
              >
                <Path
                  d="M35,15 Q50,15 58,28 Q62,38 58,55 Q52,75 35,80 Q18,75 12,55 Q8,38 12,28 Q20,15 35,15"
                  fill="rgba(0, 0, 0, 0.08)"
                />
                
                <Path
                  d="M35,10 Q50,10 58,23 Q62,33 58,50 Q52,70 35,75 Q18,70 12,50 Q8,33 12,23 Q20,10 35,10"
                  fill={balloonColor}
                  stroke={balloonColor}
                  strokeWidth="1"
                />
                
                <Path
                  d="M22,20 Q28,15 30,22 Q28,28 22,26 Q19,23 22,20"
                  fill="rgba(255, 255, 255, 0.55)"
                />
                
                <Path
                  d="M45,48 Q48,53 43,56 Q40,54 42,50 Q44,48 45,48"
                  fill="rgba(0, 0, 0, 0.08)"
                />
                
                <Path
                  d="M33,75 Q35,82 37,75"
                  fill={balloonColor}
                  stroke={balloonColor}
                  strokeWidth="2"
                />
                
                <Line
                  x1="35"
                  y1="82"
                  x2="35"
                  y2={80 + stringLength}
                  stroke="rgba(80, 80, 80, 0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </Svg>
              
              <Text style={styles.balloonLetter}>
                {char.toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  balloonsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 0,
    maxWidth: '100%',
  },
  balloonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -6,
  },
  spacer: {
    width: 12,
  },
  balloonSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  balloonLetter: {
    fontSize: 32,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    position: 'absolute',
    top: 28,
    zIndex: 2,
    includeFontPadding: false,
  },
});
