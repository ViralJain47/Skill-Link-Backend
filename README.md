# Skill-Link-Backend


# API-Endpoints
-authRoute (/api/auth)
    - /register  request={name,email,password}  200OkResponse={message} 
    - /login     request={email,password}       200OkResponse={userId,otp}
    - /verify    request={userId,otp}           200OkResponse={message,token}
    - /me        request={token}                200OkResponse={...userData}