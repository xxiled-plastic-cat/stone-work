# xUSD Staking App - Mobile Development Plan

## Project Overview

A simple, single-screen React Native mobile application for staking xUSD tokens on the Algorand blockchain. Users either see their staked balance (if wallet connected) or a connect wallet button (if not connected). This plan focuses on the mobile app setup and design foundation.

## Phase 1: Project Setup & Environment

**Status:** In Progress - Expo app with Restyle styling and 5 color themes configured

### 1.1 React Native Project Initialization

- [x] Initialize React Native project with TypeScript (using Expo)


### 1.2 Core Dependencies Installation

- [x] Add Restyle for type-safe styling system (instead of NativeWind)
- [ ] Install state management (Zustand) for wallet/balance state
- [ ] Install async storage for local data persistence
- [ ] Add vector icons (react-native-vector-icons)
- [ ] Install TypeScript types for vector icons
- [ ] Install development tools (included in base project)
- [ ] Add haptic feedback library for button interactions

### 1.3 Project Structure Setup

- [ ] Create src/ directory structure
- [ ] Create components/ directory for reusable UI components
- [ ] Create store/ directory for state management
- [ ] Create types/ directory for TypeScript definitions
- [ ] Create utils/ directory for helper functions
- [ ] Create hooks/ directory for custom React hooks
- [ ] Create constants/ directory for app constants
- [ ] Create styles/ directory for styling utilities
- [ ] Create assets/ directory for images, fonts, etc.
- [ ] Create and configure tailwind.config.js
- [ ] Configure metro.config.js for NativeWind
- [ ] Configure babel.config.js for NativeWind

## Phase 2: Design System & UI Foundation

### 2.1 Design System Creation with Restyle

- [x] Configure Restyle theme and styled components
- [x] Define custom color palette in Restyle theme
- [x] Create typography scale and font families in Restyle theme
- [x] Add custom fonts: Playfair Display (serif) for headings, Montserrat (sans-serif) for body
- [x] Set up spacing and layout utilities
- [x] Create reusable styled components using Restyle
- [x] Create first styled component: ThemeSwitcherButton
- [x] Organize components in dedicated directory structure
- [x] Create SavingsBalance component with neumorphic styling
- [x] Integrate SVG icon support and replace text with xUSD icon
- [x] Create ActionButton component with image parameter support
- [x] Create IconActionButton component with FontAwesome icons
- [x] Add plus and minus action buttons with space-between layout
- [x] Design iconography system with react-native-vector-icons
- [ ] Create loading states and animations with Restyle

### 2.2 Theme Configuration

- [x] Implement multiple color theme support (5 themes: Light Pink, Terracotta, Grey, Granite, Obsidian)
- [x] Configure theme variants in Restyle configuration
- [x] Create theme provider and context for dynamic theme switching
- [x] Define theme-aware utility classes and components
- [ ] Add system theme detection and automatic switching

### 2.3 Theme Demo & Testing

- [x] Create interactive theme switcher demo
- [x] Test all 5 color themes (Light Pink, Terracotta, Grey, Granite, Obsidian)
- [x] Verify theme switching works correctly
- [x] Test typography variants across themes

### 2.4 Responsive Design Setup

- [x] Configure Restyle responsive utilities and breakpoints
- [ ] Create device-specific utility classes in Restyle config
- [ ] Implement responsive design patterns using Restyle breakpoints
- [ ] Test responsive behavior on various device sizes (iPhone SE to iPad)

## Phase 3: Core App Architecture

### 3.1 Single Screen Architecture

- [ ] Create main App component with conditional rendering
- [ ] Implement wallet connection state management
- [ ] Design clean, focused single-screen layout
- [ ] Add smooth transitions between connected/disconnected states

### 3.2 App States & UI Structure

```
App States:
├── Wallet Not Connected
│   └── Connect Wallet Button
└── Wallet Connected
    ├── Staked Balance Display
    ├── Add to Stake Button
    └── Unstake Button
```

### 3.3 State Management Setup

- [ ] Create global state structure for wallet connection
- [ ] Implement wallet connection state (connected/disconnected)
- [ ] Add staked balance state management
- [ ] Implement loading and error states
- [ ] Create transaction state (pending, success, failure)

## Phase 4: Single Screen Development

### 4.1 Main App Screen Components

- [ ] **Wallet Disconnected State**: Clean, welcoming connect wallet UI
- [ ] **Wallet Connected State**: Staked balance display with action buttons
- [x] **Balance Display**: Large, clear xUSD staked amount
- [x] **Action Buttons**: Add to stake and unstake buttons
- [ ] **Loading States**: Smooth loading indicators for transactions
- [ ] **Error States**: User-friendly error messages

### 4.2 Interactive Components

- [ ] **Connect Wallet Button**: Prominent, accessible wallet connection
- [ ] **Add to Stake Modal**: Input field for additional staking amount
- [ ] **Unstake Modal**: Confirmation modal for unstaking
- [ ] **Transaction Feedback**: Success/failure notifications
- [ ] **Loading Overlays**: Transaction processing indicators

### 4.3 UI Polish

- [ ] **Smooth Transitions**: Between connected/disconnected states
- [ ] **Haptic Feedback**: Button press confirmations
- [ ] **Visual Hierarchy**: Clear information prioritization
- [ ] **Accessibility**: Screen reader support and proper focus management

## Phase 5: User Experience Features

### 5.1 Simple Onboarding

- [ ] First-time user tooltip explaining staking
- [ ] Clean, minimal wallet connection flow
- [ ] Brief explanation of compound rewards

### 5.2 Interactive Elements

- [ ] Pull-to-refresh for balance updates
- [ ] Haptic feedback for all button interactions
- [ ] Smooth transitions and micro-animations
- [ ] Loading skeletons for balance fetching
- [ ] Swipe gestures for modal dismissal

### 5.3 Visual Feedback

- [ ] Real-time balance updates
- [ ] Clear visual feedback for transactions
- [ ] Subtle animations for state changes
- [ ] Progress indicators for transaction processing

## Phase 6: Technical Implementation

### 6.1 Local Storage & Caching

- [ ] Implement secure storage for wallet connection state
- [ ] Cache staked balance for offline viewing
- [ ] Add data synchronization for balance updates
- [ ] Store user preferences (theme, etc.)

### 6.2 Performance Optimization

- [ ] Optimize component re-renders with React.memo
- [ ] Implement efficient state updates
- [ ] Add performance monitoring
- [ ] Optimize animation performance
- [ ] Minimize bundle size with tree shaking

### 6.3 Error Handling

- [ ] Create global error boundary
- [ ] Implement network error handling
- [ ] Add user-friendly error messages
- [ ] Create retry mechanisms

## Phase 7: Testing & Quality Assurance

### 7.1 Testing Setup

- [ ] Configure Jest for unit testing
- [ ] Set up React Native Testing Library
- [ ] Add end-to-end testing with Detox
- [ ] Implement snapshot testing

### 7.2 Code Quality

- [ ] Set up continuous integration
- [ ] Add automated testing pipeline
- [ ] Implement code coverage tracking
- [ ] Create automated deployment pipeline

## Phase 8: Platform-Specific Features

### 8.1 iOS-Specific Features

- [ ] Configure iOS app icons and launch screens
- [ ] Implement iOS-specific navigation patterns
- [ ] Add iOS-specific permissions
- [ ] Configure iOS build settings

### 8.2 Android-Specific Features

- [ ] Configure Android app icons and splash screens
- [ ] Implement Android-specific navigation patterns
- [ ] Add Android-specific permissions
- [ ] Configure Android build settings

## Phase 9: Security & Privacy

### 9.1 Security Implementation

- [ ] Implement secure local storage
- [ ] Add biometric authentication option
- [ ] Implement app security (prevent screenshots in sensitive areas)
- [ ] Add certificate pinning for API calls

### 9.2 Privacy Features

- [ ] Implement privacy settings
- [ ] Add data export functionality
- [ ] Create privacy policy integration
- [ ] Implement consent management

## Phase 10: Deployment Preparation

### 10.1 Build Configuration

- [ ] Configure release builds for iOS and Android
- [ ] Set up code signing and certificates
- [ ] Configure app store metadata
- [ ] Create app store screenshots and descriptions

### 10.2 Distribution

- [ ] Set up TestFlight for iOS beta testing
- [ ] Configure Google Play Console for Android
- [ ] Create internal testing distribution
- [ ] Plan public release strategy

## Technical Considerations

### NativeWind Benefits for xUSD App

- **Consistent Styling**: Same utility classes work across iOS and Android
- **Rapid Development**: Familiar Tailwind CSS patterns speed up UI development
- **Responsive Design**: Built-in responsive utilities for different screen sizes
- **Theme System**: Easy dark/light mode implementation for better UX
- **Performance**: Compile-time CSS generation for optimal performance
- **Maintainability**: Utility-first approach reduces custom CSS complexity

### Development Tools

- **React Native CLI vs Expo**: Use React Native CLI for maximum flexibility
- **TypeScript**: Mandatory for type safety and better developer experience
- **State Management**: Redux Toolkit or Zustand for wallet connection and balance state
- **Styling**: NativeWind for utility-first CSS styling (Tailwind CSS for React Native)
- **Single Screen**: No navigation library needed - simple conditional rendering

### Performance Targets

- App startup time: < 3 seconds
- Screen transition animations: 60fps
- Memory usage: < 100MB during normal operation
- Bundle size: < 50MB total

### Device Support

- iOS: 12.0 and above
- Android: API level 21 (Android 5.0) and above
- Screen sizes: iPhone SE to iPad Pro, Android phones to tablets

## Next Steps

1. Initialize the React Native project with TypeScript
2. Set up NativeWind and development environment
3. Create the basic project structure
4. Implement the design system and theme
5. Build the single screen with wallet connection states
6. Create the staking interface components

---

_Note: This plan focuses on the mobile app foundation. Wallet integration and smart contract interactions will be addressed in a separate planning phase._
