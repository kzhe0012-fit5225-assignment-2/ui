export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "ap-southeast-2:8983d328-a70c-4f43-85c3-107afd6ac37b",

    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-2_jo1SFXrMl",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4qjpo96ksdn8574jf3vulg255d",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: "code", // 'code' | 'link'

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: "USER_PASSWORD_AUTH",

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "ass2.auth.ap-southeast-2.amazoncognito.com",
      redirectSignIn: window.location.href,
      redirectSignOut: window.location.href,
      responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
      //   scope: ["email"],
    },
  },
};
