 "use server"

import { currentUser } from "@clerk/nextjs"
import prisma from "@/lib/prisma";
import { formSchemaType } from "@/schemas/form";

class UserNotFoundErr extends Error {}

 export async function GetFormStats() {
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundErr();
    }
    
    const stats = await prisma?.form.aggregate({
        where: {
            userId : user.id,
        },
        _sum: {
            visit: true,
            submission: true,
        }
    })

    const visits = stats._sum.visit || 0;
    const submissions = stats._sum.submission || 0;

    let submissionRate = 0;

    if(visits > 0){
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate =  100 - submissionRate;

    return{
        visits, submissions, submissionRate, bounceRate
    }

 }

 export async function CreateForm(
    data: formSchemaType 
    ){
        console.log(data.name)

 }