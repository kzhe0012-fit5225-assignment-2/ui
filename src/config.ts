export const apiName = "FIT5225ass2";

export const config = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-1:b4f0844e-263f-432e-b8c7-2af78371ba8c",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_scLARNQR0",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4vblvrfskq4ujijichue5rcmr1",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: "code", // 'code' | 'link'

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: "USER_PASSWORD_AUTH",

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "5225-ass2-pool.auth.us-east-1.amazoncognito.com",
      redirectSignIn: window.location.origin + window.location.pathname,
      redirectSignOut: window.location.origin + window.location.pathname,
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
  API: {
    endpoints: [
      {
        name: apiName, // (required) - API Name (This name is used used in the client app to identify the API - API.get('your-api-name', '/path'))
        endpoint: "https://4c15jwrdf3.execute-api.us-east-1.amazonaws.com/dev", // (required) -API Gateway URL + environment
        region: "us-east-1", // (required) - API Gateway region
      },
    ],
  },
};
