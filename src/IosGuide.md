# React Native IOS Setup

This is guide you to Xcode setup while enabling React Native Firebase Authentication.

=> Add GoogleService-info.plist in Xcode 
  Path : MyApp/GoogleService-info.plist

## Email and Password authentication with firebase

1. Enable Email/Password Auth on [Firebase](https://console.firebase.google.com/). 
    - No requirements of any Xcode setup.

## Facebook authentication with firebase

1. Follow the steps of [Facebook developer console](https://developers.facebook.com/apps/).
    - Perform steps 2,3,4 of setup guide of [Facebook](https://developers.facebook.com/apps/).

2. In Xcode add follwoing code at AppDelegate.m file
    ```
     #import <FBSDKCoreKit/FBSDKCoreKit.h>

     - (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString  ,id> *)options {  return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options] 
    ```

## Google authentication with firebase

1. Follow the setup guide of [Firebase](https://console.firebase.google.com/) for firebase setup.

2. Add URL schemes in Info.plist file in Xcode
    ```
    <key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string><YOUR_REVERSE_CLIENT_ID></string>
			</array>
		</dict>
	</array>
    ```

## Phone number authentication with firebase

1. Enable Phone Auth on [Firebase](https://console.firebase.google.com/). 
    - No requirements of any Xcode setup if you had already added URL schmes otherwise follow the step 2 of google auth.

## Apple authentication with firebase

1. From Signing & Capabilities to add capability in Xcode.
    - click on + button and add `Sign In with Apple`.
    - After in `Target` section which name is <YOURAPP_Name>, in that `Team` -> `Signing` info, add apple ID.
    - Also in `Target` section which name is <YOURAPP_Name_Tests>, in that `Team` -> `Signing` info, add apple ID.

## Resolve conflict of @react-native-firebase/auth plugin

1. For ios setup in your app follow all steps of firebase while adding your ios app in firebase.