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