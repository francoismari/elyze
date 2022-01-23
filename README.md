# Pre-requisites

Firebase Cloud Messaging is required for all managed and bare workflow Android apps made with Expo.
You must register an app through the Firebase console and place the configuration file (google-services.json) at the root of the project.
See https://docs.expo.dev/push-notifications/using-fcm/ for more details.

# Installation

This app is made using Expo CLI, follow the React-Native documentation to setup your dev environnement :
https://reactnative.dev/docs/environment-setup

# Configure AWS Amplify

This app uses the AWS Amplify GraphQL API to store and retrieve data.
Follow the instructions to install Amplify CLI here : https://docs.amplify.aws/cli/start/install/

You will need an AWS account to create a GraphQL API and import the schema.

In the working directory, type `amplify init` and select 'AWS Profile' as your authentification method.
Then use `amplify configure` to connect your AWS account.
Then, push the schema to AWS Amplify with `amplify push`

You can then use AWS AppSync to insert new propositions into DynamoDB

# Issues

Modules `react-native-deck-swiper` and `react-native-onboarding-swiper` require an old version of react-native-web to function, but it is impossible to downgrade this dependency without breaking the dependency tree of other modules. Therefore, the app cannot be run in browser : use Android or iOS instead.
