import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

const privatePaths = ['/me']

const authPaths = ['/login','/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const sessionToken = request.cookies.get('sessionToken')?.value;
    const {pathname} = request.nextUrl
    console.log("🚀 ~ middleware ~ pathname:", pathname)
    const productEditRegex = /^\/product\/\d+\/edit$/


    //chua dang nhap thi ko cho vao privatePaths
    if(privatePaths.some(path => pathname.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    //dang nhap thi ko cho vao login va register
    if(authPaths.some(path => pathname.startsWith(path)) && sessionToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(pathname.match(productEditRegex) && !sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))

     }


    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/login','/register','/product/:path*'],
}