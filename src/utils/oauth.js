import { google } from 'googleapis'
import { config } from '../../config/env.js'

let oAuth2Client;

try {
    oAuth2Client = new google.auth.OAuth2(
        config.clientId,
        config.clientSecret,
        config.requestUri
    )
    oAuth2Client.setCredentials({refresh_token: config.refreshToken})
    
    console.log("oAuth Setup")
        
} catch (error) {
    console.log(error)    
}

export default oAuth2Client;