import z from 'zod'


export const RegisterSchema = z.object({
    name: z.string().trim().min(2, {
        message:'Name must be at least 2 characters.'
    }).max(256, {
        message:'Name must be at most 256 characters.'
    }),
    email: z.string().email(),
    password: z.string().trim().min(6,  { 
        message:'Name must be at least 6 characters.'
    }).max(100),
    confirmPassword: z.string().trim().min(6).max(100)

}).strict().superRefine(({ confirmPassword, password }, ctx) => {
    if(confirmPassword !== password) { 
        ctx.addIssue({
            code:"custom",
            message:'Mật khẩu không khớp',
            path:['confirmPassword']
        })
    }
})

export type RegisterType =  z.infer<typeof RegisterSchema>

export const RegisterRes = z.object({
    data: z.object({
      token: z.string(),
      expiresAt: z.string(),
      account: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string()
      })
    }),
    message: z.string()
  })
  
  export type RegisterResType = z.infer<typeof RegisterRes>


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6).max(100)
}).strict()

export type LoginType = z.infer<typeof LoginSchema>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>

export const SlideSessionSchema = z.object({}).strict()

export type SlideSessionType = z.infer<typeof SlideSessionSchema>

export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>