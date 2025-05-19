import { google } from 'googleapis'
import { config } from '../../config/env.js'
import logger from './logger.js';

let oAuth2Client;

try {
    oAuth2Client = new google.auth.OAuth2(
        config.clientId,
        config.clientSecret,
        config.requestUri
    )
    oAuth2Client.setCredentials({refresh_token: config.refreshToken})
    
    logger.info("OAUTH SETUP COMPLETE")
        
} catch (error) {
    logger.error(error.message)   
}

export default oAuth2Client;