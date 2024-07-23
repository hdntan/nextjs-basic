import http from "@/lib/http";
import { LoginResType, LoginType, RegisterResType, RegisterType } from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";
import { register } from "module";



const authApiRequest = {
    login: (body: LoginType) =>  http.post<LoginResType>('/auth/login',body ),
    register: (body: RegisterType) => http.post<RegisterResType>('/auth/register',body),
    auth:(body: {sessionToken: string}) => http.post('/api/auth', body, {
        baseUrl:''
    }),
    logoutFromNextServerToServer: (sessionToken: string) => http.post<MessageResType>('/auth/logout', {}, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
        }
    }),

    logoutFromNextClientToNextServer:() => http.post<MessageResType>('/api/auth/logout', {}, {
        baseUrl:''
    })
}


export default authApiRequest