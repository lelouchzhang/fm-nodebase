"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'
import { email, z } from 'zod';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { authClient } from "@/lib/auth-client";


const registerSchema = z.object({
    email: z.email("请输入可用邮箱地址"),
    password: z.string().min(6, "密码长度不能小于6位"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { // refine(): 先让 Zod 做完类型层面的解析，拿到一个已经类型安全的值，再对这个值做任意 JavaScript 逻辑校验，如果通不过就抛出自定义错误。
    message: "两次密码不一致",
    path: ["confirmPassword"]
})

type RegisterFormDatas = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const router = useRouter()
    const form = useForm<RegisterFormDatas>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = async (values: RegisterFormDatas) => {
        await authClient.signUp.email({
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                router.push("/login")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)

            }
        })
    }

    return (
        <div className='flex flex-col gap-6'>
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>开始使用</CardTitle>
                    <CardDescription>注册一个账号，开始使用AI自动化</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='grid gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <Button variant='outline' className='w-full' type='button' disabled={form.formState.isSubmitting}>
                                        使用Github账号登录
                                    </Button>
                                    <Button variant='outline' className='w-full' type='button' disabled={form.formState.isSubmitting}>
                                        使用Google账号登录
                                    </Button>
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem className='mt-4'>
                                                <FormLabel>邮箱</FormLabel>
                                                <FormControl>
                                                    {/* <input {...field} />相当于
                                                        <Input
                                                        name={field.name}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        /> 
                                                    register("name")是原生的写法，shadcn已将register封装成controller    
                                                    */}
                                                    <Input type='email' placeholder='fenmiao@gmail.com' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem className='mt-4'>
                                                <FormLabel>密码</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='******' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem className='mt-4'>
                                                <FormLabel>确认密码</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='******' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className='w-full mt-4' disabled={form.formState.isSubmitting}>注册</Button>
                                </div>
                                <div className='text-center text-sm'>
                                    已有账号？<Link href='/login' className='underline underline-offset-3'>点击登录</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div >
    )
}